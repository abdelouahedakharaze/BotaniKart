import os
import subprocess
import random
import time


def is_git_repository():
    # Check if the current directory is a Git repository
    try:
        result = subprocess.run(
            ["git", "rev-parse", "--is-inside-work-tree"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=True
        )
        return result.returncode == 0
    except subprocess.CalledProcessError:
        return False


def git_add_commit_push(file_path):
    try:
        # Stage the file
        subprocess.run(["git", "add", file_path], check=True)
        
        # Commit with the file name as the message
        commit_message = os.path.basename(file_path)
        subprocess.run(["git", "commit", "-m", commit_message], check=True)
        
        # Push changes
        subprocess.run(["git", "push"], check=True)
        print(f"  ----------=========== Successfully pushed: {os.path.basename(file_path)} ====================-------")
    except subprocess.CalledProcessError as e:
        print(f"Error during Git operation: {e}")
        return False  # Stop if there's an error
    except Exception as e:
        print(f"Unexpected error: {e}")
        return False  # Stop if there's an error
    return True  # Continue if successful


def get_unpushed_files():
    try:
        # Get list of untracked/modified files
        result = subprocess.run(
            ["git", "status", "--porcelain"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=True,
            text=True
        )
        # Get file paths (ignores deleted files)
        unpushed_files = [line.split()[1] for line in result.stdout.splitlines() if line]
        return unpushed_files
    except subprocess.CalledProcessError as e:
        print(f"Error fetching Git status: {e}")
        return []
    except Exception as e:
        print(f"Unexpected error: {e}")
        return []


def main(directory_path):
    sleep_times = []

    # Check if the current directory is a Git repository
    if not is_git_repository():
        print("Error: This script must be run inside a Git repository.")
        return

    # Get a list of unpushed files
    unpushed_files = get_unpushed_files()

    if not unpushed_files:
        print("No unpushed files found. Exiting.")
        return

    # Shuffle the list to randomize the order
    random.shuffle(unpushed_files)

    for file_path in unpushed_files:
        success = git_add_commit_push(file_path)
        
        if not success:
            print("Stopping due to an error.")
            break  # Stop as soon as there's a problem
        
        # Sleep for a random time between 1 and 3 seconds
        sleep_time = random.randint(1, 3)
        sleep_times.append(sleep_time)
        time.sleep(sleep_time)

    # Print sleep times and their total
    print("\nSleep times:")
    for i, sleep_time in enumerate(sleep_times, start=1):
        print(f"{i}. {sleep_time} seconds")

    total_sleep_time = sum(sleep_times)
    print(f"\nTotal sleep time: {total_sleep_time} seconds")


if __name__ == "__main__":
    directory_path = os.getcwd()  # Use the current working directory
    main(directory_path)
