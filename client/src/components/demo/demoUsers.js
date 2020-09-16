import { AuthContext } from '../../context/auth/AuthContext';

const { register } = useContext(AuthContext);

export const seedDatabase = () => {
  const user1 = {
    firstName: 'Sam',
    lastName: 'Jones',
    username: 'Sammy',
    email: 'sammy@sammy.com',
    password: 12345678,
    confirmPassword: 12345678,
  };

  const user1Profile = {
    bio:
      'I am a full stack web developer looking to collaborate on a variety of projects. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus porttitor odio at pharetra. Aenean tortor urna, consectetur varius mauris sit amet, sodales maximus nisl. Nam dictum orci id vestibulum imperdiet. Sed pellentesque nibh et augue consequat, ac sodales neque vestibulum.',
    skills: 'HTML, CSS, JavaScript, Python, Node.js, React, Angular, MongoDB',
  };

  const user2 = {
    firstName: 'Mary',
    lastName: 'Larkey',
    username: 'Mary78',
    email: 'mary@mary.com',
    password: 12345678,
    confirmPassword: 12345678,
  };

  const user2Profile = {
    bio:
      'I am an experienced front end developer working on a variety of personal projects. I would enjoy collaborating with other developers. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus porttitor odio at pharetra. Aenean tortor urna, consectetur varius mauris sit amet, sodales maximus nisl. Nam dictum orci id vestibulum imperdiet.',
    skills: 'HTML, CSS, Sass, JavaScript, PHP, Node.js, Vue',
  };

  const user3 = {
    firstName: 'Maddie',
    lastName: 'Knight',
    username: 'Maddie',
    email: 'maddie@maddie.com',
    password: 12345678,
    confirmPassword: 12345678,
  };

  const user3Profile = {
    bio:
      'Most of my experience is in software development. I would enjoy collaborating with other developers to try to learn additional technologies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus porttitor odio at pharetra. Aenean tortor urna, consectetur varius mauris sit amet, sodales maximus nisl. Nam dictum orci id vestibulum imperdiet.',
    skills: 'JavaScript, Ruby, Rails, Angular',
  };

  const user4 = {
    firstName: 'Mark',
    lastName: 'Smith',
    username: 'Marky',
    email: 'mark@mark.com',
    password: 12345678,
    confirmPassword: 12345678,
  };

  const user4Profile = {
    bio:
      'I am passionate about software development and working on a software development team. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus porttitor odio at pharetra. Aenean tortor urna, consectetur varius mauris sit amet, sodales maximus nisl. Nam dictum orci id vestibulum imperdiet.',
    skills: 'HTML, CSS, JavaScript, React, Node.js, SQL',
  };

  const user5 = {
    firstName: 'Trevor',
    lastName: 'Trent',
    username: 'TrevTren',
    email: 'trevor@trevor.com',
    password: 12345678,
    confirmPassword: 12345678,
  };

  const user5Profile = {
    bio:
      'I am new to web development but have a background in systems engineering. I am looking to find people to learn with by working on side projects. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus porttitor odio at pharetra.',
    skills: 'HTML, CSS, JavaScript',
  };

  const user6 = {
    firstName: 'Melissa',
    lastName: 'Roney',
    username: 'Mel892',
    email: 'mel@mel.com',
    password: 12345678,
    confirmPassword: 12345678,
  };

  const user6profile = {
    bio:
      'I am a bootcamp student looking to expand my technical expertise. Leave me a comment if you would like to work with me on any projects. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus porttitor odio at pharetra.',
    skills: 'JavaScript, PHP, Laravel, Python, Django',
  };

  const user7 = {
    firstName: 'Jeremy',
    lastName: 'Jones',
    username: 'JerJones',
    email: 'jeremy@jeremy.com',
    password: 12345678,
    confirmPassword: 12345678,
  };

  const user7profile = {
    bio:
      'Leave me a comment if you would like to work with me on any projects. I am interested in working on a variety of open source projects. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus porttitor odio at pharetra.',
    skills: 'JavaScript, Ruby, Rails, Postgres, MySQL',
  };

  const user8 = {
    firstName: 'Jeff',
    lastName: 'Molar',
    username: 'Jeff761',
    email: 'jeff@jeff.com',
    password: 12345678,
    confirmPassword: 12345678,
  };

  const user8profile = {
    bio:
      'I have a lot of database experience and would like to collaborate on some projects. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus porttitor odio at pharetra.',
    skills: 'Python, C, Regular Expressions, Postgres, MySQL',
  };

  const user9 = {
    firstName: 'John',
    lastName: 'Nell',
    username: 'JohnN',
    email: 'john@john.com',
    password: 12345678,
    confirmPassword: 12345678,
  };

  const user9profile = {
    bio:
      'My previous experience is in database management, but I am looking to get into front end web development. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus porttitor odio at pharetra.',
    skills: 'Regular Expressions, Postgres, MySQL, MongoDB',
  };

  const user10 = {
    firstName: 'Natalie',
    lastName: 'Monarch',
    username: 'Nat44',
    email: 'natalie@natalie.com',
    password: 12345678,
    confirmPassword: 12345678,
  };

  const user10profile = {
    bio:
      'I am an experienced web developer working on personal projects. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus porttitor odio at pharetra.',
    skills: 'HTML, CSS, Sass, Node.js, JavaScript, Regular Expressions, Express, Python, MySQL',
  };

  const user11 = {
    firstName: 'George',
    lastName: 'Telk',
    username: 'Telky',
    email: 'george@george.com',
    password: 12345678,
    confirmPassword: 12345678,
  };

  const user11profile = {
    bio:
      'I am new to software development, but I have a lot of previous experience in project management. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus porttitor odio at pharetra.',
    skills: 'HTML, CSS, Sass, JavaScript',
  };

  const user12 = {
    firstName: 'Jack',
    lastName: 'Harrison',
    username: 'Jacky',
    email: 'jack@jack.com',
    password: 12345678,
    confirmPassword: 12345678,
  };

  const user12profile = {
    bio:
      'I would like to collaborate with other developers on a variety of projects. I have project management and web development experience. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus porttitor odio at pharetra.',
    skills: 'HTML5, CSS, JavaScript, C#, Postgres',
  };

  const user13 = {
    firstName: 'Nicole',
    lastName: 'Wright',
    username: 'Nicky24',
    email: 'nicole@nicole.com',
    password: 12345678,
    confirmPassword: 12345678,
  };

  const user13profile = {
    bio:
      'I am working on a variety of personal projects and am open to collaborating with other developers. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus porttitor odio at pharetra.',
    skills: 'HTML, MySQL, MongoDB, React, React Native, Angular',
  };

  const user14 = {
    firstName: 'Jacob',
    lastName: 'Powell',
    username: 'Jacob2',
    email: 'jacob@jacob.com',
    password: 12345678,
    confirmPassword: 12345678,
  };

  const user14profile = {
    bio:
      'I have a lot of experience managing large teams for enterprise projects. I want to get better at coding and design. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus porttitor odio at pharetra.',
    skills: 'JavaScript, React, React Native, MongoDB, Express',
  };

  const user15 = {
    firstName: 'Karen',
    lastName: 'Bonnet',
    username: 'Karrie',
    email: 'karen@karen.com',
    password: 12345678,
    confirmPassword: 12345678,
  };

  const user15profile = {
    bio:
      'I am working on a variety of web development projects. I want to expand my knowledge of mobile development. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus porttitor odio at pharetra.',
    skills: 'JavaScript, Vue, Python, Postgres, MySQL',
  };



  const users = [
    user1,
    user2,
    user3,
    user4,
    user5,
    user6,
    user7,
    user8,
    user9,
    user10,
    user11,
    user12,
    user13,
    user14,
    user15,
  ];

  users.forEach((el) => register(el));
};
