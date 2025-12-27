const fs = require('fs');
const path = 'app/page.tsx';
try {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
        console.log('Successfully deleted ' + path);
    } else {
        console.log('File not found: ' + path);
    }
} catch (err) {
    console.error('Error deleting file: ' + err.message);
}
