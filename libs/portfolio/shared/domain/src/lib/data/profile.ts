import { convertDateToYearsOfAge } from '@nx-suite/shared/util';

export const profile = {
  title: 'Ioannis Tsironis',
  subtitle:
    'Senior Software Web Engineer,<br /> Open Source Contributor and<br /> Front-End Enthusiast',
  about: {
    title: 'I Develop System that Works',
    content: [
      'Passionate and highly-skilled senior software engineer with 9 years of experience. I am extremely motivated to work on challenging projects using state of the art technologies; cooperating effectively with other team members. Always trying to enrich my skills and stay updated on the latest technologies.',
      "Currently, mainly focusing on the front-end word technologies and especially developing applications using the Angular Framework. As an experienced Angular developer, I specialize in crafting robust and efficient web applications. I have a strong foundation in Angular's core concepts and I am skilful at applying domain-driven design principles to create modular and maintainable code.",
      "Outside of my professional work, I'm passionate about contributing to the open-source community. I actively participate in various projects, focusing on bug fixes, feature enhancements, and improving documentation.",
    ],
    details: {
      name: 'Ioannis Tsironis',
      age: convertDateToYearsOfAge('07-04-1990'),
      occupation: 'Software Engineer',
      education: "Master's in Information Technology",
      phone: '(+30) 6979414255',
      email: 'gtsironis8@gmail.com',
      nationality: 'Greek',
      languages: 'Greek (Native),<br /> English (Advanced)',
    },
  },
};
