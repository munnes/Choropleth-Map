

import {colorLegend} from './colorLegend.js'

const svg=d3.select('svg');

const margin={top:15,right:10,bottom:10,left:10};

let allData=[];
const myTitle=(id,txt,x)=>d3.select('div')
     .append("text")  
     .attr('y',margin.top+x)
     .html("<br/>"+txt+"<br/>")
     .attr('id',id);
      

Promise.all([
     d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'),
     d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json')
])
 .then(([data,dataEdu])=>
     {
     //data are in topojson format to convert =>geojson
   const counties= topojson.feature(data, data.objects.counties)   
 
  function mergeArrayObjects(arr1,arr2){
       for (let i=0;i<arr1.length;i++){
          for (let j=0;j<arr2.length;j++){
               if (arr1[i].id===arr2[j].fips){
                    allData.push([arr1[i],arr2[j]])
                    
               }
          }
       }
  
   }
  mergeArrayObjects(counties.features,dataEdu)
  render(counties.features,allData)

     }
 )


const render=(data,allData)=>{
/*******title************ */
     myTitle('title','United States Educational Attainment',10)
     myTitle('description',"Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)",30)    
    
/******color************** */
const clr= [3,12,21,30,39,48,57,66]
const colorScale=d3.scaleLinear() 
.domain(clr)
.range(["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#4a1486"])
//source: http://colorbrewer2.org/#type=sequential&scheme=Purples&n=8
/********************** */
const paths=svg.selectAll('path')
.data(data);
paths.enter().append('path')
.attr('d',d3.geoPath())
.attr('class','county')
.data(allData)
.attr('data-fips',d=>d[1].fips)
.attr('data-education',d=>d[1].bachelorsOrHigher)
.attr('fill',d=>colorScale(d[1].bachelorsOrHigher))

.append('title')
                        .text(d =>d[1].area_name+', '+d[1].state+':  '+d[1].bachelorsOrHigher+'%')
                        .attr('id','tooltip')
                        .attr('data-education',d=>d[1].bachelorsOrHigher);
/****************** */
svg.call(
     colorLegend,{
         colorScale,
         spacing:30,
         textOffset:40
          }
     )
 }
 






 
  
 
     
      
 
