let semondSemester = [
    {
        subject :'hardware', 
        grade : 4,
        credit: 3
    },
    {
        subject :'probsolve',
        grade :4,
        credit: 1
    },
    {
        subject :'Practicum',
        grade :4,
        credit: 1
    },
    {
        subject :'ComOr',
        grade :3.5,
        credit:3 
    },
    {
        subject :'Intro',
        grade :3.5,
        credit: 1
    },
    {
        subject :'Algo',
        grade :3.5,
        credit: 3
    },
    {
        subject :'DataBase',
        grade :3.5,
        credit: 3
    },
    {
        subject :'elec',
        grade :4,
        credit: 3
    },
    {
        subject :'Signal',
        grade :3.5,
        credit: 3
    }
]

let total = 0 ;
let credits = 0 ;


// semondSemester.find('subject':'elec');
semondSemester.forEach((x)=>{
    total += (x.grade*x.credit);
    credits += x.credit ;
})

console.log("second GPA: "+ total/credits);
console.log("all    GPA: "+ (total+2.98*20)/(credits+20));