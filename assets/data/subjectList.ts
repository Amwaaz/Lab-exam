const subjects = [
    {
      id: "1",
      image: require("../images/PF.jpg"), // Image for Programming
      subjectName: "Programming",
      topics: [
        { id: "1.1", name: "JavaScript Basics",details:'JavaScript Basics' },
        { id: "1.2", name: "React Native",details:'React Native Basics' },
      ],
    },
    {
      id: "2",
      image: require("../images/maths.jpg"), // Image for Maths
      subjectName: "Maths",
      topics: [
        { id: "2.1", name: "Algebra",details:'ALGEBRA Basics' },
        { id: "2.2", name: "Geometry",details:'GEOMETRY Basics' },
      ],
    },
    {
      id: "3",
      image: require("../images/history.jpg"), // Image for Science
      subjectName: "History",
      topics: [
        { id: "3.1", name: "WW1",details:'WW1 Basics' },
        { id: "3.2", name: "WW2",details:'WW2 Basics' },
      ],
    },
  ];
  
  export default subjects;
  