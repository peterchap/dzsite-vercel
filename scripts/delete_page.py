import os
path = r'c:\Code\DZ-Site\datazag-website\app\page.tsx'
if os.path.exists(path):
    os.remove(path)
    print(f'Successfully deleted {path}')
else:
    print(f'File {path} not found')
