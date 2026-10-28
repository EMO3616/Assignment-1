export const seed = {
  categories: [
    {id:1,name:'Technology',status:1},
    {id:2,name:'Education',status:1},
    {id:3,name:'Campus Life',status:0},
  ],
  news: [
    {id:1,title:'React workshop opens this week',content:'Students can register for the ReactJS workshop.',categoryId:1,createdBy:1,status:1,tags:'react,workshop'},
    {id:2,title:'New semester orientation',content:'Orientation sessions for new students.',categoryId:2,createdBy:2,status:1,tags:'education'},
    {id:3,title:'Campus newsletter',content:'Highlights from the student community.',categoryId:3,createdBy:1,status:0,tags:'campus'},
  ],
  users: [
    {id:1,username:'Admin',password:'Admin',role:1,status:1},
    {id:2,username:'editor',password:'staff123',role:2,status:1},
    {id:3,username:'reporter',password:'staff123',role:2,status:0},
  ],
};
