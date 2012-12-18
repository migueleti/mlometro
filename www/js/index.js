/*$("#botao").click(function(e) { 
  $("#tabela tr:last").after('<tr><td>abc</td></tr>');
});*/



$(function() {
	$.mask.definitions['~'] = "[+-]";
	$("#qtdItens").numeric({ negative: false });
	$("#volumeItem").numeric({ negative: false });
	$("#precoItem").maskMoney({showSymbol:false, thousands:'.', decimal:','});
	$("#alertPesquisar").hide();
	loadTabelaItens();
});



$("#btnInvokeSearch").click(function(e){
	//if ($("#searchContent").is(":visible"))
	$("#alertPesquisar").toggle();
});


$("#closeAlertPesquisar").click(function(e){
	$("#alertPesquisar").toggle();
});

$("#btnDoSearch").click(function(e){
	//$("#searchContent").is(":visible");

});

$("#addCerveja").click(function(e){
	$("#areaCadastro").toggle();
});

$("#adiconarCotacao").click(function(e) {

	var nomeCerveja = $("#nomeCerveja").val();
	var localCerveja = $("#localCerveja").val();
	var qtdItens = $("#qtdItens").val();
	var volumeItem = $("#volumeItem").val();
	var precoItem = $("#precoItem").val();

	var regexEmpty = /(^$|\s+)/g;

	var error = false;
	var msgCampoObrigatorio = "Campo obrigatório!";

	if (regexEmpty.test(nomeCerveja)) {
		aplicarEstiloErro("nomeCerveja", msgCampoObrigatorio);
		error = true;
	} else {
		removerEstiloErro("nomeCerveja");
		error = false;
	}

	if (regexEmpty.test(localCerveja)) {
		aplicarEstiloErro("localCerveja", msgCampoObrigatorio);
		error = true;
	} else {
		removerEstiloErro("localCerveja");
		error = false;
	}

	if (regexEmpty.test(qtdItens)) {
		aplicarEstiloErro("qtdItens", msgCampoObrigatorio);
		error = true;
	} else {
		removerEstiloErro("qtdItens");
		error = false;
	}

	if (regexEmpty.test(volumeItem)) {
		aplicarEstiloErro("volumeItem", msgCampoObrigatorio);
		error = true;
	} else {
		removerEstiloErro("volumeItem");
		error = false;
	}

	if (regexEmpty.test(precoItem)) {
		aplicarEstiloErro("precoItem", msgCampoObrigatorio);
		error = true;
	} else {
		removerEstiloErro("precoItem");
		error = false;
	}

	console.log(error);

	if (error == true) {
		var htmlAlerta = '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
		'<br />O formulário contem erros!' +
		'<br />Corrija-os para prosseguir.';
		$("#campo-alerta").addClass("alert alert-error");
		$("#campo-alerta").html(htmlAlerta);
		return;
	}

	$("#campo-alerta").removeClass("alert alert-error");
	$("#campo-alerta").html("");

	adicionaCerveja(nomeCerveja, localCerveja, qtdItens, volumeItem, precoItem);

	window.location = "index.html";

});

function aplicarEstiloErro(nomeGrupo, errMsg) {
	$("#control-group-" + nomeGrupo).addClass("error");
	$("#help-block-" + nomeGrupo).html(errMsg);
	$("#adiconarCotacao").addClass("btn-danger");
	
}

function removerEstiloErro(nomeGrupo) {
	$("#control-group-" + nomeGrupo).removeClass("error");
	$("#help-block-" + nomeGrupo).html("");
	$("#adiconarCotacao").removeClass("btn-danger");
}

function generateCervejaId(nomeCerveja, localCerveja, timestamp) {
	return nomeCerveja + "#" + localCerveja + "#" + timestamp;
}

function generateTimeStamp() {
	var d = new Date();
	return pad(d.getDate(),2) + pad((d.getMonth()+1),2) + pad(d.getFullYear(), 4) + pad(d.getHours(),2) + pad(d.getMinutes(),2) + pad(d.getSeconds(),2);
}

function getStringNow(timeStamp) {
	var now = timeStamp.slice(0,2) + "/";
	now += timeStamp.slice(2,4) + "/";
	now += timeStamp.slice(4,8) + "-";
	now += timeStamp.slice(8,10) + ":";
	now += timeStamp.slice(10,12) + ":";
	now += timeStamp.slice(12,14);
	return now;
}

function pad(number, length) {
   
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
   
    return str;

}

function adicionaCerveja(nomeCerveja, localCerveja, qtdItens, volumeItem, precoItem) {
	
	//var listaCervejas = [{}];

	var listaCervejasSS = localStorage.getItem("listaCervejas");

	var timeStamp = generateTimeStamp();
	var dataHora = getStringNow(timeStamp);
	var id = generateCervejaId(nomeCerveja, localCerveja, timeStamp);

	var valorMl = (parseInt(precoItem)/parseInt(volumeItem)).toFixed(6);

	var objCerveja = { 'id' : id,
					   'dataHora' : dataHora,
					   'nomeCerveja' : nomeCerveja, 
					   'localCerveja' : localCerveja,
					   'qtdItens' : qtdItens,
					   'volumeItem' : volumeItem,
					   'precoItem' : precoItem,
					   'valorMl' : valorMl
					 };

	if (listaCervejasSS == null) {
		listaCervejasSS = [objCerveja];
	} else {
		listaCervejasSS = JSON.parse(listaCervejasSS);
		if (!containsItem(id, listaCervejasSS))
			listaCervejasSS.push(objCerveja);
		else {

		}
	}

	localStorage.setItem("listaCervejas", JSON.stringify(listaCervejasSS));
}

function containsItem(id, listaCervejas) {
	for (var i = 0; i < listaCervejas.length; i++) {
		var item = listaCervejas[i];
		if (id == item.id)
			return true;
	}
	return false;
}

function loadTabelaItens() {
	var listaCervejas = JSON.parse(localStorage.getItem("listaCervejas"));

	if (listaCervejas == null)
		return;

	listaCervejas.sort(sortFunction);

	var html = '';

	for (var i = 0; i < listaCervejas.length; i++) {
		var item = listaCervejas[i];
		html += "Cerveja: " + item.nomeCerveja + "<br />";
		html += "Local: " + item.localCerveja + "<br />";
		html += "Quantidade: " + item.qtdItens + "&nbsp;-&nbsp;" +
					"Volume por item: " + item.volumeItem + " Mls<br />";
		html += "Preço por Item: R$ " + item.precoItem + "<br />";
		html += "Valor por ml: R$ " + item.valorMl + "<br />";
		html += "Data e hora: " + item.dataHora;
		var htmlButtonEdit = '<a style="position: relative; top: -7px; right: -7px; float: right; padding: 0; border: 0"><i class="icon-remove-circle"></i></a>';
		var htmlButtonDelete = '<a style="position: relative; top: -7px; right: -7px; float: right; padding: 0; border: 0"><i class="icon-edit"></i></a>';
		$('#tabela tr:last').after('<tr><td>' + htmlButtonEdit + htmlButtonDelete + html + '</td></tr>');
		html = '';


	}

	
	
}

function sortFunction(a, b) {
	return parseInt(a.valorMl*1000000) - parseInt(b.valorMl*1000000);
}