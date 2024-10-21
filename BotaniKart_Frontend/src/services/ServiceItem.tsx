import React from 'react'

interface ServiceItemProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  name: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ icon: Icon, name }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-light-green p-3 rounded-full mb-2">
        <Icon className="h-6 w-6 text-medium-green" />
      </div>
      <span className="text-sm text-dark-brown">{name}</span>
    </div>
  )
}

export default ServiceItem
