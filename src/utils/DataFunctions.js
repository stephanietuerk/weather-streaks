import * as moment from 'moment';

export default class DataFunctions {

    static getDayOfYear(date) {
        const year = moment(date, "YYYY-MM-DD").format('YYYY');
        const diff = moment(date).diff(moment(`${year}-01-01`), 'days');
        return ((!moment(date).isLeapYear() && 
            moment(date, "YYY-MM-DD").format('MM') !== '01' &&
            moment(date, "YYY-MM-DD").format('MM') !== '02') 
            ? diff + 1
            : diff);
      }
    
      static groupBy(objectArray, property) {
        return objectArray.reduce((acc, obj) => {
          const key = obj[property];
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(obj);
          return acc;
        }, {});
      }
    
      static getAverages(objectArray, groupByProp) {
        const avgVars = Object.keys(objectArray[0].dataVals);
        console.log(avgVars);
        const groupedObj = this.groupBy(objectArray, groupByProp);
        console.log(groupedObj);
        const objWithAverages = Object.entries(groupedObj).map(([key, valArray]) => {
          const avgObj = avgVars.reduce((acc, propertyName) => {
            const filteredArray = valArray.map(d => d.dataVals[propertyName]).filter(d => !isNaN(d));
            const average = filteredArray.reduce((acc, cur) => {return acc + cur;}, 0)/filteredArray.length;
            acc[propertyName] = average;
            return acc;
          }, {});
          return {
            dayOfYear: Number(key),
            dayAvgs: avgObj
          };
        });
        console.log(objWithAverages);
        return objWithAverages;
      }

      static getDifferencesFromAverage(objectArray, avgsArray) {

      }
} 