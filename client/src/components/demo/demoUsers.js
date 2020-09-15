import { AuthContext } from '../../context/auth/AuthContext';

const { register } = useContext(AuthContext);

export const seedDatabase = () => {
    const user1 = {
        firstName: Sam,
        lastName: Jones,
        username: Sammy,
        email: 'sammy@sammy.com',
        password: 12345678,
        confirmPassword: 12345678,
      };
    
      const user1Profile = {
          bio: 'I am a full stack web developer looking to collaborate on a variety of projects. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus porttitor odio at pharetra. Aenean tortor urna, consectetur varius mauris sit amet, sodales maximus nisl. Nam dictum orci id vestibulum imperdiet. Sed pellentesque nibh et augue consequat, ac sodales neque vestibulum.', 
          skills: 'HTML, CSS, JavaScript, Python, Node.js, React, Angular, MongoDB'
      };
    
      const user2 = {
        firstName: Mary,
        lastName: Larkey,
        username: Mary78,
        email: 'mary@mary.com',
        password: 12345678,
        confirmPassword: 12345678,
      };
    
      const user2Profile = {
          bio: 'I am an experienced front end developer working on a variety of personal projects. I would enjoy collaborating with other developers. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus porttitor odio at pharetra. Aenean tortor urna, consectetur varius mauris sit amet, sodales maximus nisl. Nam dictum orci id vestibulum imperdiet.', 
          skills: 'HTML, CSS, Sass, JavaScript, PHP, Node.js, Vue'
      };
    
      const user3 = {
        firstName: Maddie,
        lastName: Knight,
        username: Maddie,
        email: 'maddie@maddie.com',
        password: 12345678,
        confirmPassword: 12345678,
      };
    
      const user3Profile = {
          bio: 'Most of my experience is in software development. I would enjoy collaborating with other developers to try to learn additional technologies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus porttitor odio at pharetra. Aenean tortor urna, consectetur varius mauris sit amet, sodales maximus nisl. Nam dictum orci id vestibulum imperdiet.', 
          skills: 'JavaScript, Ruby, Rails, Angular'
      };
    
      const user4 = {
        firstName: Mark,
        lastName: Smith,
        username: Marky,
        email: 'mark@mark.com',
        password: 12345678,
        confirmPassword: 12345678,
      };
    
      const user4Profile = {
          bio: 'I am passionate about software development and working on a software development team. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus porttitor odio at pharetra. Aenean tortor urna, consectetur varius mauris sit amet, sodales maximus nisl. Nam dictum orci id vestibulum imperdiet.', 
          skills: 'HTML, CSS, JavaScript, Node.js, SQL'
      };

      const user5 = {
        firstName: Trevor,
        lastName: Trent,
        username: TrevTren,
        email: 'trevor@trevor.com',
        password: 12345678,
        confirmPassword: 12345678,
      };
    
      const user5Profile = {
          bio: 'I am new to web development but have a background in systems engineering. I am looking to find people to learn with by working on side projects. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus porttitor odio at pharetra.', 
          skills: 'HTML, CSS, JavaScript'
      };
    
      const users = [user1, user2, user3, user4, user5];
    
      users.forEach(el => register(el));
}
