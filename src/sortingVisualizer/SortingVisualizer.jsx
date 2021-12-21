import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getSelectionSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getInsertionSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getBubbleSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getHeapSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getQuickSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

//speed of animations
const ANIMATION_SPEED_MS = 1;

//numberof bars in array
const NUMBER_OF_ARRAY_BARS = 340;

//primary color of bars
const PRIMARY_COLOR = 'turquoise';

//secondary color of bars
const SECONDARY_COLOR = 'red';


export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    //the number of bars on the screen
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      //the height of the bars on the screen
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      //retrieve the element of the bars in order to alter them
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, newHeight] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;

      if(i % 2 == 0){
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
      else{
        setTimeout(() => {
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);

        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  selectionSort(){
    const animations = getSelectionSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [toSwap, minHeight, minIdx, oneHeight, oneIndx] = animations[i];

      const minBarStyle = arrayBars[minIdx].style;
      const iBarStyle = arrayBars[oneIndx].style;
      //set the bars to the secondary color
      if(i % 2 == 0){
        setTimeout(() => {
          minBarStyle.backgroundColor = SECONDARY_COLOR;
          iBarStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
      else{
        setTimeout(() => {
          minBarStyle.backgroundColor = PRIMARY_COLOR;
          iBarStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
      if(toSwap){
        //swap the heights of the bars
        setTimeout(() => {
          minBarStyle.height = `${oneHeight}px`;
          iBarStyle.height = `${minHeight}px`;
        }, i * ANIMATION_SPEED_MS);
        //change the colors of the bars back to the primary color
        setTimeout(() => {
          minBarStyle.backgroundColor = PRIMARY_COLOR;
          iBarStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  insertionSort(){
    const animations = getInsertionSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [indxOne, oneHeight, twoHeight] = animations[i];

      const barOneStyle = arrayBars[indxOne].style;
      const barTwoStyle = arrayBars[indxOne+1].style;

      if(i % 2 == 0){
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
      else{
        setTimeout(() => {
          barOneStyle.height = `${twoHeight}px`;
          barTwoStyle.height = `${oneHeight}px`;
        }, i * ANIMATION_SPEED_MS);
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [toSwap, indxOne, oneHeight, twoHeight] = animations[i];
      const barOneStyle = arrayBars[indxOne].style;
      const barTwoStyle = arrayBars[indxOne+1].style;
      //toSwap: 0 is to change to secondary color
      if(toSwap === 0){
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);

      }
      //2 is to change to primary color.
      else if(toSwap === 2){
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
      //1 is change height and change to primary color
      else{
        setTimeout(() => {
          barOneStyle.height = `${twoHeight}px`;
          barTwoStyle.height = `${oneHeight}px`;
        }, i * ANIMATION_SPEED_MS);

        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [indxOne, indxTwo, oneHeight, twoHeight] = animations[i];
      const barOneStyle = arrayBars[indxOne].style;
      const barTwoStyle = arrayBars[indxTwo].style;

      if(i % 2 == 0){
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
      else{
        setTimeout(() => {
          barOneStyle.height = `${twoHeight}px`;
          barTwoStyle.height = `${oneHeight}px`;
        }, i * ANIMATION_SPEED_MS);
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [isPivot, toSwap, indxOne, indxTwo, oneHeight, twoHeight ] = animations[i];
      const barOneStyle = arrayBars[indxOne].style;
      const barTwoStyle = arrayBars[indxTwo].style;

      
      if(isPivot === 1){
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
      else if(isPivot === 2){
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
      

      if(toSwap){
        setTimeout(() => {
          barOneStyle.height = `${twoHeight}px`;
          barTwoStyle.height = `${oneHeight}px`;
        }, i * ANIMATION_SPEED_MS);

        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }

      else{
        if(isPivot === 0){
          setTimeout(() => {
            barOneStyle.backgroundColor = SECONDARY_COLOR;
            barTwoStyle.backgroundColor = SECONDARY_COLOR;
          }, i *ANIMATION_SPEED_MS);
        }
        else{
          setTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }
  }

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`
            }}></div>
        ))}
        <br />
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.selectionSort()}>Selection Sort</button>
        <button onClick={() => this.insertionSort()}>Insertion Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
