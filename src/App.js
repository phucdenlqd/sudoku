import React,{Component} from 'react';
import './App.scss';
import {solveSudoku,check} from './sudoku' 

// la grille initial
var sudoku = [...Array(9)].map(e => Array(9).fill(""));

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      puzzle:sudoku, /* la grille */
      listGiven:[], /* le array de position les données entrée par utilisateur */
      posibility:true, /* posibilité de solution  */
      solved:false /*  resoulu ou pas */
    }
  }

  // accepter et retourner si la valeur entrée est "" ou 0-9
  // Ex: "abc" => refusé , "9"=>9, "84"=> 4
  validInput = (value) => {
    if(value===""){
      return value
    }
    value = parseInt(value)
    if(isNaN(value)){
      return false
    }
    return value%10
  }

  // Resoudre le sudoku
  solvePuzzle=()=>{
    let solvedPuzzle = solveSudoku(this.state.puzzle)
    if(solvedPuzzle){
      this.setState({puzzle:solvedPuzzle,solved:true})
    }
    
  }

  // Verifier and mettre à jour le grille chaque fois l'utilisateur entre un numéro
  updatePuzzle=(value,indexRow,indexCol)=>{

    let newPuzzle = [...this.state.puzzle]
    let newlistGiven = []
    let posibility=this.state.posibility
    // Il faut pas utiliser if(this.validInput(value)) car on accepte ""
    if(this.validInput(value)!==false){
      value=this.validInput(value)

      //Mettre a jour
      newPuzzle[indexRow][indexCol]=value
      posibility = check(newPuzzle)
      newPuzzle.forEach((row,rowIndex) => {
        row.forEach((cell,cellIndex)=>{
          if(cell){
            newlistGiven.push([rowIndex,cellIndex])
          }
        })
      });

      this.setState({puzzle:newPuzzle,listGiven:newlistGiven,posibility:posibility})
    }
    
  }

  restart=()=>{
    let sudoku=[...Array(9)].map(e => Array(9).fill(""))
    this.setState({solved:false,puzzle:sudoku,listGiven:[]})
  }
  
  render(){
    // contenu de la tableau à afficher
    let tableContent = this.state.puzzle.map((row,indexRow)=>{
      let rowContent = row.map((cell,indexCol)=>{
        let isGiven = this.state.listGiven.some((ele)=>JSON.stringify(ele)===JSON.stringify([indexRow,indexCol])) 
        return (
        <td className={isGiven?"table-cell table-cell--given":"table-cell"} >
          <input 
            index={[indexRow,indexCol]} 
            type='text'
            value={cell}
            className="table-input"
            disabled={this.state.solved}
            onChange={(event)=>{this.updatePuzzle(event.target.value,indexRow,indexCol)}}
          /> 
        </td>
        )
      })
      return <tr className="table-row" >{rowContent}</tr>
    })
    // contenu du instructeur
    let instructor = this.state.solved ? "Voici le sudoku résolu. Réessayer?":
                    this.state.posibility? "Entrer les numéros et puis appuyer le bouton \"Résoudre\" ":
                    "Les entrées ne sont pas bonnes. Merci de les verifier"

    return(
      <div className='container'>
        <div className="title">Solveur de Sudoku</div>
        <div className="table-container">
          <table className="table" >
            <tbody className="table-body">
            {tableContent}
            </tbody>
          </table>
        </div>
        <div className="button-container">
            <p className="instructor">
              {instructor}
            </p>
            {!this.state.solved && <button className="button button-solve" disabled={!this.state.posibility} value="Résoudre" onClick={this.solvePuzzle}>Résoudre</button>}
            {this.state.solved && <button className="button button-restart" onClick={this.restart} >Réessayer</button>}
          </div>
      </div>
      
    )
  }
}


export default App;
