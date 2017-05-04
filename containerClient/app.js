var containerTemplate = '<h3><%= companyName %></h3>' +
'<h3><%= containerNumber %></h3>' +
'<small>status: <%= status %></small>' ;
// '<small><%= gender %></small>';

var containers = [];

var makeTemplate = function (data) {
    var li = document.createElement('li');
    var containerList = document.querySelector('.container-list');
    var compiled = _.template(containerTemplate);
    var containerHtml = compiled(data);
    li.innerHTML = containerHtml;
    containerList.insertBefore(li, containerList.firstChild);
}

var updatedContainerList = function(){
    var containerData = containers[containers.length-1];
    makeTemplate(containerData);
}

var getValues = function() {
    var companyName = document.querySelector('input[name=company-name]').value;
    var containerNumber = document.querySelector('input[type=number]').value;
    var status = document.querySelector('input[name=container-status]').value;
    status = status.options[status.selectedIndex].value;


    document.querySelector('input[name=company-name]').value = '';
    document.querySelector('input[type=number]').value = '';
    document.querySelector('input[name=container-status]').value = '';


    return {
        companyName: companyName ,
        containerNumber: containerNumber,
        status: status
    };

};





(function() {
    var form = document.querySelector('form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        var values = getValues();
        console.log(values);
        fetch('/containers', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(values)
            })
            .then(function(resp) {
                return resp.json();

            })
            .then(function(createdContainer) {
                containers.push(createdContainer);
                console.log(containers);
                updatedContainerList();
            })
        return false;
    })
})();
