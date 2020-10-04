
// Promise Pending
d3.json("samples.json").then(function(data){
    console.log(data);
    dropdown(data);
});  
  


function dropdown(nameData) {
    nameData['names'].forEach(name=>{
        var dropdownOption=d3.select('#selDataset').append('option');
        dropdownOption.text(name);
        dropdownOption.property('value', name);
    });
};
function optionChanged(select){
    console.log(select);
    hBarBubble (select);

};

function hBarBubble (sampleValue){
    d3.json("samples.json").then(function(data){
        var samples=data['samples'];
        var findSample=samples.filter(sample => sample.id==sampleValue)[0];
        // console.log(findSample)
        traceHBar = {
                type: 'bar',
                x: findSample['sample_values'].slice(0,10).reverse(),
                y: findSample['otu_ids'].map(otu_id=>'OTU '+otu_id.toString()).slice(0,10).reverse(),
                text: findSample['otu_labels'].slice(0,10).reverse(),
                orientation: 'h'
        };
        console.log(traceHBar);        
        Plotly.newPlot('bar', [traceHBar]);
        
        traceBubble={
            type: 'scatter',
            x: findSample['otu_ids'],
            y: findSample['sample_values'],
            mode: 'markers',
            marker: {
                size: findSample['sample_values'].map(sample_value=>sample_value/2),
                color: findSample['otu_ids']
                
            }
        };
        Plotly.newPlot('bubble', [traceBubble]);
    });
};



function updateinfoChart(sampleValue) {
    d3.json("samples.json").then(function(data){
        var metaData=data['metadata'];
        var findmetaData=metaData.filter(meta => meta['id']==sampleValue)[0];
        // console.log(metaData)
        var infoChart = d3.select('#sample-metadata');
        infoChart.html('')
        Object.entries(findmetaData).forEach(([meta_key,meta_value])=>{
            infoChart.append('h4')
                .text(`${meta_key}: ${meta_value}`);
        });
    });
};
hBarBubble('940');
updateinfoChart('940');