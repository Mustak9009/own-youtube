class Person{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    getInfo(){
        console.log("User: ",this.name,"age is: ",this.age);
    }
}
const obj1 = new Person("Soniya",20);
obj1.getInfo();

class Student extends Person{
    constructor(name,age,grade){
        super(name,age);
        this.grade = grade;
    }
    getInfo(){
        super.getInfo();
        console.log("Grade: ",this.grade);
    }
}
const st1 = new Student("Tannu",22,'C');
st1.getInfo();