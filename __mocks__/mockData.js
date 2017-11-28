/* global jest*/ 
const mockData = {
  onChangeEvent: {
    target: {
      username: 'louisdante'
    }
  },
  dashboardOnChangeEvent: {
    target: {
      message: 'hi',
      flag: 'normal'
    }
  },
  onSubmitState: {
    username: "louis",
    email: 'louisdante9@gmail.com',
    password: 'biology1',
    phone: "099655555",
    errors: {},
    isLoading: false
  },
  userModalState: {
    matchingUsers: [],
    name: 'lo',
    userId: '1',
    offset: 0,
    count: 0,
    addUser: '',
    groupUser: [
      {
      User:{
        id: 1,
        username: "louisdante9"
      },
      groupId: 7,
      id: 28,
      userId: 1
    }
  ]
  },
  dashboardHeaderState: {
    groupId: '',
    message: '',
    flag: 'normal',
  },
  dashboardGroupData: [
    {
      Users: [
        {
          GroupUsers: {
            createdAt :"2017-10-16T15:59:11.122Z",
            groupId:1,
            isAdmin:null,
            unread:null,
            updatedAt:"2017-10-16T15:59:11.122Z",
            userId:1
          },
          createdAt:"2017-10-09T15:39:22.472Z",
          email:"louisdante9@gmail.com",
          id:1,
          phone:"09083999020",
          resetPasswordToken:"238e88cf2768e3",
          updatedAt:"2017-11-23T16:57:45.495Z",
          username:"louisdante9"
        }
      ],
      createdAt:"2017-10-10T08:21:14.338Z",
      description:"this is a test",
      id:1,
      name:"javascript",
      updatedAt:"2017-10-10T08:21:14.338Z"
    }
  ],
  forgotPasswwordData: {
    target: {
      email: 'louisdante'
    }
  },
  forgotPasswwordState: {
    email: 'louisdante9@gmail.com'
  },

  changePasswordDate: {
    target: {
      newPassword: 'bilogy1',
      confirmPassword: 'biology1'
    }
  },

  changePasswordState: {
    newPassword: '',
    confirmPassword: '',
  },

  modalHandleChangeEvent: {
    preventDefault: jest.fn(),
    target: {
      name: 'sample name'
    }
  },
  modalState: {
    name: 'devops',
    description: 'nice group'
  },
  messagesProps: {
    messages: [
      {
        User: {
          createdAt: "2017-10-09T15:39:22.472Z",
          email: "louisdante9@gmail.com",
          expiryTime:"1511459865494",
          id:1,
          phone:"09083999020",
          resetPasswordToken:"238e88cf2768e340c3b9a7c23b48955d5bfd7d84",
          updatedAt:"2017-11-23T16:57:45.495Z",
          username:"louisdante9"
        },
        createdAt: "2017-10-12T08:38:12.100Z",
        flag: "normal",
        groupId: 1,
        id: 1,
        message: "hello\n",
        msgRead: null,
        updatedAt: "2017-10-12T08:38:12.100Z",
        userId: 1
      },
      {
        User: {
          createdAt: "2017-10-09T15:39:22.472Z",
          email: "louisdante9@gmail.com",
          expiryTime:"1511459865494",
          id:2,
          phone:"09083999020",
          resetPasswordToken:"238e88cf2768e340c3b9a7c23b48955d5bfd7d84",
          updatedAt:"2017-11-23T16:57:45.495Z",
          username:"louisdante9"
        },
        createdAt: "2017-10-12T08:38:12.100Z",
        flag: "normal",
        groupId: 1,
        id: 2,
        message: "hello\n",
        msgRead: null,
        updatedAt: "2017-10-12T08:38:12.100Z",
        userId: 1
      }
    ],
    groups: []
  },
  messageBoxProps: {
    onChange: jest.fn(() => Promise.resolve()),
    onSubmit: jest.fn(()=>Promise.resolve()),
    groups: [
      {
        Users:[
          {
            Groupuser: {
              createdAt:"2017-10-10T08:21:14.397Z",
              groupId:1,
              isAdmin:true,
              unread:null,
              updatedAt:"2017-10-10T08:21:14.397Z",
              userId: 1,
            },
            createdAt:"2017-10-09T15:39:22.472Z",
            email:"louisdante9@gmail.com",
            expiryTime:"1511459865494",
            id: 1,
            phone:"09083999020",
            resetPasswordToken:"238e88cf2768e340c",
            updatedAt:"2017-11-23T16:57:45.495Z",
            username:"louisdante9"
          }
        ],
        createdAt:"2017-10-10T08:21:14.338Z",
        description:"this is a test",
        id:1,
        name:"javascript",
        updatedAt:"2017-10-10T08:21:14.338Z",
      },
      
    ],
    message: '',
    flag: ''
  }
};

export default mockData;