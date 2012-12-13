/*$("#botao").click(function(e) { 
  $("#tabela tr:last").after('<tr><td>abc</td></tr>');
});*/



$(function() {
	$.mask.definitions['~'] = "[+-]";
	$("#qtdItens").numeric({ negative: false });
	$("#volumeItem").numeric({ negative: false });
	$("#precoItem").maskMoney({showSymbol:false, thousands:'.', decimal:','});
	$("#alertPesquisar").hide();
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