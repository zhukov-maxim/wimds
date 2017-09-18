import fs from 'fs';

const io = {
  getFolderContent: (path) => {
    const stats = fs.statSync(path);

    if (stats.isFile()) {
      return {
        type: 'file',
        name: path,
        size: stats.size
      };
    } else if (stats.isDirectory()) {
      const children = [];

      const content = fs.readdirSync(path);

      content.forEach(child => {
        const childPath = `${path}/${child}`;
        const childContent = io.getFolderContent(childPath);
        children.push(childContent);
      });

      const folderSize = children.reduce((sum, child) => sum + child.size, 0);

      return {
        type: 'folder',
        name: path,
        size: folderSize,
        children
      };
    }

    return {
      type: 'unknown type'
    };
  }
};

module.exports = io;
