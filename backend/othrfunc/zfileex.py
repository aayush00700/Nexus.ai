import zipfile
import os

def unzip_file(zip_path, extract_to):
    """
    Unzips a .zip file to a specified directory.

    Args:
        zip_path (str): Path to the .zip file.
        extract_to (str): Directory to extract the contents into.

    Raises:
        FileNotFoundError: If the zip file does not exist.
        zipfile.BadZipFile: If the file is not a zip file or is corrupted.
    """
    if not os.path.exists(zip_path):
        raise FileNotFoundError(f"Zip file not found: {zip_path}")
    
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_to)
        print(f"Extracted '{zip_path}' to '{extract_to}'")
