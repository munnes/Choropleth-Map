

export const colorLegend=(selection,props)=>{
const {
    colorScale, 
    spacing,
    textOffset
}=props

const groups =    selection.selectAll('.gk')
    .data(colorScale.domain())
    .attr('id','legend');
   
const groupEnter=  groups
   .enter().append('g')
   .attr('class','gk');
          
groupEnter // we should statrt it here to avoid overlap
   .merge(groups )
   .attr('transform',(d, i)=>`translate( ${i*spacing+500},10)`);  //i *30 to make sequnce unoverlaped rect 

groupEnter
    .append('rect')          
     .merge(groups.select('.k') )
        .attr('fill',colorScale)
        .attr('x',100)
        .attr('y',20)
        .attr('width',30)
        .attr('height',10)
        .attr('stroke','black')
        .attr('class','k')

groupEnter
        .append('text')          
         .merge(groups.select('text') )
         .text(d=>d+'%')
         .attr('x', textOffset)
         .attr('class','txtK')
         .attr('transform',d=>`translate( 57,45)`);  
}