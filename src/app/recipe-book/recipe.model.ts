export class Recipe{
    constructor(name:string, desc:string, imgPath:string){
        this.name=name;
        this.description=desc;
        this.imagePath=imgPath;
    }

    public name:string;
    public description:string;
    public imagePath:string;
}