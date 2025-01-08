from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework import status

from .models import Product, Review  # Import models from the product app
from .serializers import ProductSerializer  # Import serializers for the product app


# Get all products with optional keyword search and pagination
@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword', '')  # Get the keyword for filtering products
    products = Product.objects.filter(name__icontains=query).order_by('-createdAt')  # Filter products by name

    # Paginate the products
    page = request.query_params.get('page')
    paginator = Paginator(products, 5)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if not page:
        page = 1

    page = int(page)
    serializer = ProductSerializer(products, many=True)  # Serialize the paginated products
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


# Get top-rated products
@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[:5]  # Get top 5 products with rating >= 4
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# Get details of a single product by ID
@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)  # Fetch the product by ID
    serializer = ProductSerializer(product, many=False)  # Serialize the product
    return Response(serializer.data)


# Create a new product (Admin only)
@api_view(['POST'])
@permission_classes([IsAdminUser])  # Restrict to admin users
def createProduct(request):
    user = request.user  # Get the logged-in admin user
    product = Product.objects.create(
        user=user,
        name='Sample Name',  # Default sample name
        price=0,  # Default price
        brand='Sample Brand',  # Default brand
        countInStock=0,  # Default stock count
        category='Sample Category',  # Default category
        description=''  # Default description
    )
    serializer = ProductSerializer(product, many=False)  # Serialize the new product
    return Response(serializer.data)


# Update an existing product (Admin only)
@api_view(['PUT'])
@permission_classes([IsAdminUser])  # Restrict to admin users
def updateProduct(request, pk):
    product = Product.objects.get(_id=pk)  # Fetch the product by ID
    data = request.data  # Get updated product data

    # Update product fields
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']
    product.save()  # Save the updated product

    serializer = ProductSerializer(product, many=False)  # Serialize the updated product
    return Response(serializer.data)


# Delete a product (Admin only)
@api_view(['DELETE'])
@permission_classes([IsAdminUser])  # Restrict to admin users
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)  # Fetch the product by ID
    product.delete()  # Delete the product
    return Response('Product Deleted')


# Upload an image for a product
@api_view(['POST'])
def uploadImage(request):
    data = request.data  # Get request data
    product_id = data['product_id']  # Get the product ID
    product = Product.objects.get(_id=product_id)  # Fetch the product

    product.image = request.FILES.get('image')  # Assign the uploaded image
    product.save()  # Save the product with the image

    return Response('Image was uploaded')


# Create a new review for a product
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Restrict to authenticated users
def createProductReview(request, pk):
    user = request.user  # Get the logged-in user
    product = Product.objects.get(_id=pk)  # Fetch the product by ID
    data = request.data  # Get review data

    # Check if the user already reviewed this product
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        return Response({'detail': 'Product already reviewed'}, status=status.HTTP_400_BAD_REQUEST)

    # Ensure a rating is provided
    if data['rating'] == 0:
        return Response({'detail': 'Please select a rating'}, status=status.HTTP_400_BAD_REQUEST)

    # Create the review
    review = Review.objects.create(
        user=user,
        product=product,
        name=user.first_name,
        rating=data['rating'],
        comment=data['comment'],
    )

    # Update product's review count and average rating
    reviews = product.review_set.all()
    product.numReviews = len(reviews)

    total = sum(r.rating for r in reviews)
    product.rating = total / len(reviews)
    product.save()

    return Response('Review Added')
