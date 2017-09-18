const testData = {
  type: 'root',
  name: 'Root',
  size: 24700,
  children: [
    {
      type: 'folder',
      name: 'Photos',
      size: 14700,
      children: [
        {
          type: 'folder',
          name: 'Vacation',
          size: 9800,
          children: [
            {
              type: 'file',
              name: 'vacation-001.jpg',
              size: 2400
            },
            {
              type: 'folder',
              name: 'Video',
              size: 7100,
              children: [
                {
                  type: 'file',
                  name: 'short-video-001.mov',
                  size: 2000
                },
                {
                  type: 'file',
                  name: 'short-video-002.mov',
                  size: 100
                },
                {
                  type: 'file',
                  name: 'short-video-003.mov',
                  size: 5000
                }
              ]
            },
            {
              type: 'file',
              name: 'vacation-003.jpg',
              size: 300
            }
          ]
        },
        {
          type: 'file',
          name: 'home.jpg',
          size: 3200
        },
        {
          type: 'file',
          name: 'sky.jpg',
          size: 1700
        }
      ]
    },
    {
      type: 'free',
      name: 'Free Space',
      size: 10000
    }
  ]
};

export default testData;
