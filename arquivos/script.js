cronograma = {
    urlCsv: `${$('input#link').val()}&timestamp=${Date.now()}`,
    eventsSaved: null,
    horarioPadrao: $('input#horarioPadrao').val(),

    getEvents: function() {
      var _self = this;
    
      fetch(`https://corsproxy.io/?${encodeURIComponent(_self.urlCsv)}`)
        .then(response => response.text())
        .then(data => {
          const rows = data.split('\n');
          const jsonData = rows.map(row => {
            const [date, event, time, obs] = row.split(',');
            return {
              date: date && date.trim() || '',
              event: event && event.trim() || '',
              time: time && time.trim() || _self.horarioPadrao,
              obs: obs && obs.trim() || ''
            };
          });
    
          eventsSaved = jsonData;
    
          _self.mountSelector();
          _self.mountTable();
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    },
    
    
    mountTable: function (month = '') {
      const eventTable = $('.events-list');
      eventTable.empty(); // Limpar a tabela antes de preencher novamente

      // Ordenar os eventos pela data antes de exibi-los
      eventsSaved.sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('/'));
        const dateB = new Date(b.date.split('/').reverse().join('/'));
        return dateA - dateB;
      });
      eventsSaved.forEach(data => {
        var monthClass = this.getMonthYearClass(data.date)
        console.log(`fvzx`, data)
        // criacao de classe para melhor visualizacao dos eventos
        var idStatus = '';

        var parts = data.date.split('/');
        var dataCorrigida = parts[1] + '/' + parts[0] + '/' + parts[2];
        
        var dataEvento = new Date(dataCorrigida);
        var hoje = new Date();
        
        // Ajustar as datas para comparar apenas dia, mês e ano
        dataEvento.setHours(0, 0, 0, 0);
        hoje.setHours(0, 0, 0, 0);
        
        if (dataEvento < hoje) {
            idStatus = 'past';
        } else if (dataEvento.getTime() === hoje.getTime()) {
            idStatus = 'today';
        }

        const row = `
        <tr class="${monthClass}" id="${idStatus}">
          <td>
            <div class="event-date">
              <div class="event-day">${data.date}</div>
              <div class="event-month">${this.getDiaDaSemana(data.date)}</div>
            </div>
          </td>
          <td>
            ${data.event}
          </td>
          <td class="event-price">${data.time}</td>
          <td class="event-price">${data.obs}</td>
        </tr>        
        `
        if ((month === '') || (monthClass === month)) {
          eventTable.append(row);
        }
      });
    },
    
    mountSelector: function () {
      const monthSelector = $('#month-selector');
      const monthYearSet = new Set();
      
      eventsSaved.forEach(data => {
        const monthYear = this.getMonthYearClass(data.date);
        monthYearSet.add(monthYear);
      });
      
      monthYearSet.forEach(monthYear => {
        const option = `<option value="${monthYear}">${monthYear.replace('-', ' ')}</option>`;
        
        monthSelector.append(option);
      });
    },
    
    getMonthYearClass: function (date) {
      const dateParts = date.split('/');
      const month = dateParts[1];
      const year = dateParts[2];
      const monthYear = `${this.getMonthName(month)} ${year}`;
      
      return monthYear.replace(/\s/g, '-');
    },
    
    getMonthName: function (month) {
      const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];
      
      return monthNames[Number(month) - 1];
    },

    getDiaDaSemana: function(dataString) {
      const dataParts = dataString.split('/');
      const dia = parseInt(dataParts[0]);
      const mes = parseInt(dataParts[1]) - 1; // Os meses no objeto Date começam em zero (janeiro é 0)
      const ano = parseInt(dataParts[2]);
    
      const data = new Date(ano, mes, dia);
      const diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      const diaDaSemana = diasDaSemana[data.getDay()];
    
      return diaDaSemana;
    },

    bindEvents: function() {
      var _self = this;
      $('body').on('click', '#algumacoisa', function(e){
        e.preventDefault()
        console.log(_self)
      })

      $("#month-selector").change(function () {
        $('#searchInput').val('')
        var month = $("#month-selector").val();
        _self.mountTable(month);
      });    
      
      $("#searchInput").on("input", function () {
        var search = $(this).val().toLowerCase();
        var month = $("#month-selector").val();
        $(".events-list tr").each(function () {
            var eventMonth = $(this).attr("class");
            var eventText = $(this).text().toLowerCase();
            if (eventText.indexOf(search) === -1 || (month !== "" && eventMonth !== month)) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
        if ($(".events-list tr:visible").length === 0) {
            var tr = `<tr class="trNaoEncontrado">
            <td>
              Nenhum resultado encontrado
            </td>
            <td>
            </td>
            <td></td>
          </tr>        
          `
            $(".events-list").append(tr);
        } else {
            $(".trNaoEncontrado").remove();
        }
      });      

    },
  
    init: function() {
      this.bindEvents()
      this.getEvents()
    }
  
  }
  
  $(document).ready(function(){
    cronograma.init();
  })
  