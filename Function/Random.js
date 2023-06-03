function RandomMachine(){
  const Random = Math.floor((Math.random() * 100));
  if(Random <= 40){
    return 1;
  }else if(40<Random<=70){
    return 2;
  }else if(70<Random<=85){
    return 3;
  }else if(85<Random<=95){
    return 4;
  }else{
    return 5;
  }
}

module.exports = {
  RandomMachine: RandomMachine
};