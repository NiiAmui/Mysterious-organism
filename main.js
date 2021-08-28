// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

function pAequorFactory(num,arr){
  return {
    specimenNum: num,
    dna: arr,
    mutate(){
      //get a random number btn 0 and 14
      let rdm = Math.floor(Math.random() * arr.length);
      //change the value to !value of random
      const dnaBases = ['A', 'T', 'C', 'G']
      const rdm2 = Math.floor(Math.random()*3)
      const chosen = dnaBases.filter(item=>item !== this.dna[rdm])
      const final = chosen[rdm2]
      this.dna[rdm] = final

      return this.dna
    },
   compareDNA(pAequorObj) {                                        // method to compare current organism with the previous one
      let counter = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (i == 0) {                                               // show the bases of the two organisms just one time each
          console.log(`\nComparing DNA strands\nSpecimen${this.specimenNum} bases: ${this.dna}`);
          console.log(`Specimen${pAequorObj.specimenNum} bases: ${pAequorObj.dna}`);
        }
        if (this.dna[i] === pAequorObj.dna[i]) {                                      // if the two bases are equal
            console.log(this.dna[i] + " and  " + pAequorObj.dna[i] + " are equal");   // print message
            counter += 1;                                                             // increase counter
            console.log("Matching bases so far: " + counter);                         // log the counter
        }
      }
      let basesInCommon = Math.floor((100 / 15) * counter);                           // calculating the % of common bases
      return `Specimen ${this.specimenNum} and Specimen ${pAequorObj.specimenNum} are ${basesInCommon}% compatible`;
    },
    willLikelySurvive() {                                       // returns true if at least 60% of its bases are C or G
      let counter = 0;           // counter value
        for ( let i = 0; i < this.dna.length; i++ ) {           // looping over bases of caller object
          if ( this.dna[i] == "C" || this.dna[i] == "G" ) {     // if the base if C or G...
            counter += 1;                                       // increase counter
          }  
        }
      return (counter >= 9);                            
    },    
    complementStrand() {                                 
      let complementaryStrand = [];
      for ( let i = 0; i < this.dna.length; i++ ) {      
        if ( this.dna[i] === "A" ) { complementaryStrand.push("T"); }           
        else if ( this.dna[i] === "T" ) { complementaryStrand.push("A"); }      
        else if ( this.dna[i] === "C" ) { complementaryStrand.push("G"); }      
        else if ( this.dna[i] === "G" ) { complementaryStrand.push("C"); }      
        else complementaryStrand.push(this.dna[i]);
      }
      return `\n--Generating the complementary DNA strand--\n     Original DNA strand: ${this.dna}
Complementary DNA strand: ${complementaryStrand}`
      }
    }
}
  // method to create 30 specimen that can survive (at least 60% of the dna strand must be C's of G's)
let pool = () => {
  let sampleArray = [];                                // array to contain specimen for which .willLikelySurvive() returns "true"  
  while ( sampleArray.length < 30 ) {                  // loop until adaptingSpecimen array contains 30 elements
  let i = 1;                                           // counter up until 30
  let sample = pAequorFactory(i, mockUpStrand());
    sample = pAequorFactory(i, mockUpStrand());        // generating specimen
    if ( sample.willLikelySurvive() ) {
      sampleArray.push(sample.dna);
    }
    i++;
  }
  return sampleArray;
}

  // create a pool of 30, that will be the surviving specimen
console.log(`--Invoking the pool function (creating a pool of 30 surviving samples)--`)
console.log(pool());

  // create a sample object
let testSubject = pAequorFactory(1, mockUpStrand());

  // create a complementary DNA strand to the previous object
console.log(testSubject.complementStrand());