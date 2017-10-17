function getData() {
  return [
    {
      'id': 0,
      'name': 'Initial Planning',
      'children': [
        {
          'id': 1,
          'name': 'Planning Phase #1',
          'actualStart': Date.UTC(2014, 1, 10),
          'actualEnd': Date.UTC(2014, 1, 17),
          'progressValue': '30%',
          'rowHeight': 30,
          'connector': [{'connectTo': 2}]
        },
        {
          'id': 2,
          'name': 'Planning Phase #2',
          'actualStart': Date.UTC(2014, 1, 13),
          'actualEnd': Date.UTC(2014, 1, 19),
          'baselineStart': Date.UTC(2014, 1, 12),
          'baselineEnd': Date.UTC(2014, 1, 24),
          'rowHeight': 30,
          'connector': [{'connectTo': 3}]
        },
        {
          'id': 3,
          'name': 'Planning Phase #3',
          'actualStart': Date.UTC(2014, 2, 4),
          'actualEnd': Date.UTC(2014, 2, 7),
          'rowHeight': 30,
          'connector': [{'connectTo': 'milestone'}]
        },
        {
          'id': 'milestone',
          'name': 'Summary Meeting #1',
          'actualStart': Date.UTC(2014, 2, 7, 12),
          'rowHeight': 30,
          'connector': [{'connectTo': 'milestone2'}]
        },
        {
          'id': 'milestone2',
          'name': 'Summary Meeting #2',
          'actualStart': Date.UTC(2014, 2, 8, 12),
          'rowHeight': 30,
          'connector': [{'connectTo': 'milestone3'}]
        },
        {
          'id': 'milestone3',
          'name': 'Summary Meeting #3',
          'actualStart': Date.UTC(2014, 2, 9, 12),
          'rowHeight': 30
        }
      ]
    },

    {
      'id': 4,
      'name': 'Additional Planning',
      'children': [
        {
          'id': 'milestone4',
          'name': 'Initial Meeting',
          'actualStart': Date.UTC(2014, 1, 17, 12),
          'rowHeight': 30,
          'connector': [{'connectTo': 5}]
        },
        {
          'id': 5,
          'name': 'Additional Phase #1',
          'rowHeight': 30,
          'actualStart': Date.UTC(2014, 1, 22),
          'actualEnd': Date.UTC(2014, 2, 5),
          'baselineStart': Date.UTC(2014, 1, 23),
          'baselineEnd': Date.UTC(2014, 2, 7),
          'progressValue': '40%',
          'connector': [{'connectTo': 6}]
        },
        {
          'id': 6,
          'name': 'Additional Phase #2',
          'actualStart': Date.UTC(2014, 2, 6),
          'actualEnd': Date.UTC(2014, 2, 7),
          'rowHeight': 30,
          'connector': [{'connectTo': 7}]
        },
        {
          'id': 7,
          'name': 'Additional Phase #3',
          'rowHeight': 30,
          'actualStart': Date.UTC(2014, 2, 9),
          'actualEnd': Date.UTC(2014, 2, 12)
        }
      ]
    },

    {
      'id': 8,
      'name': 'Quality Assurance',
      'children': [
        {
          'id': 9,
          'name': 'QA Phase #1',
          'rowHeight': 30,
          'actualStart': Date.UTC(2014, 2, 8),
          'actualEnd': Date.UTC(2014, 2, 13),
          'baselineStart': Date.UTC(2014, 2, 10),
          'baselineEnd': Date.UTC(2014, 2, 13),
          'connector': [{'connectTo': 10}]
        },
        {
          'id': 10,
          'name': 'QA Phase #2',
          'actualStart': Date.UTC(2014, 2, 15),
          'actualEnd': Date.UTC(2014, 2, 17),
          'rowHeight': 30,
          'progressValue': '10%',
          'connector': [{'connectTo': 11}]
        },
        {
          'id': 11,
          'name': 'QA Phase #3',
          'rowHeight': 30,
          'actualStart': Date.UTC(2014, 2, 19),
          'actualEnd': Date.UTC(2014, 2, 25),
          'connector': [
            {
              'connectTo': 8,
              'connectorType': 'finish-start'
            }
          ]
        }
      ]
    }

  ];
}