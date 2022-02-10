$(document).ready(function(){

    function showTable()
    {
        var tbl=`<table id="tbl1">
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>OS</th>
            <th></th>
        </tr>
        `;
        for(let i=0; i<products.length; i++)
        {
            tbl +=`<tr class="tProd">
            <td>${products[i].id}</td>
            <td>${products[i].name}</td>
            <td class="pBrand" data-brand="${products[i].brand}">${products[i].brand}</td>
            <td>${products[i].os}</td>
            <td class="rmrow"><a href="#">X</a></td>
            </tr>`;
        }
        tbl +=`</table>`;
        $("#content").html(tbl);
    }

   
    function showDropdown()
    {
        var brandArr=[];
        var osArr=[];
       for(var i=0; i<products.length; i++)
       {
           if(osArr.includes(products[i].os) && i!= 0)
           {
               continue;
           }           
           osArr[i]=products[i].os;
       }

       for(var i=0; i<products.length; i++)
       {
            if(brandArr.includes(products[i].brand) && i!= 0) 
            {
                continue;
            }
            brandArr[i]=products[i].brand;
       }
       
       $("table").before(`<select id="osDD"><option value="" selected>All OS</option>`);

       osArr.forEach(element => {
           $("#osDD").append(`<option value='${element}'>${element}</option>`);
       });

       $("table").before(`<select id="brandDD"><option value="" selected>All Brands</option>`);
       brandArr.forEach(element => {
        $("#brandDD").append(`<option value='${element}'>${element}</option>`);
        });
    }


    function showSearch()
    {
        $("#content").append(`<input type="text" id="myInput" placeholder="Search through id or name...">`);
    }


    $("#content").on("keyup", "input#myInput", function(){
      var search=$("#myInput").val().toUpperCase();
      searchProd(search);
    });  

    function searchProd(search) {
        var  table, tr, td1, td2, i, txtValue1, txtValue2;        
        table = document.getElementById("tbl1");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td1 = tr[i].getElementsByTagName("td")[0];
          td2 = tr[i].getElementsByTagName("td")[1];
          if (td1 || td2) {
            txtValue1 = $(td1).text();
            txtValue2 = $(td2).text();
            if ((txtValue1.toUpperCase().indexOf(search) > -1) || (txtValue2.toUpperCase().indexOf(search) > -1) ){
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }        
        }     
      }
  
    const prod={
      os:"",
      brand:""
    };

    $("#content").on("click","select#osDD", function(){
      var os, brand;
      os=$(this).val().toUpperCase(); 
     prod.os=os;
     collect();
    });

    $("#content").on("click","select#brandDD", function(){
      brand=$(this).val().toUpperCase();   
      prod.brand=brand;  
      collect();
    });  
    
    function collect()
    {
      console.log(prod);
      filterDropdown(prod.os, prod.brand);
          
    }

    function filterDropdown(os, brand)
    {
        var table = document.getElementById("tbl1");
        var tr = table.getElementsByTagName("tr");
        for(var i = 0; i < tr.length; i++) 
          {
            td2 = tr[i].getElementsByTagName("td")[2];
            td3 = tr[i].getElementsByTagName("td")[3];
            //console.log((os.length=="") && (brand.length==""));
            if((os.length=="") && (brand.length==""))
            {
              $(tr[i]).show();
            }
            else if((brand=="" && ($(td3).text().toUpperCase()) === os))
            {
              $(tr[i]).show();
            }
            else if((os=="" && ($(td2).text().toUpperCase()) === brand))
            {
              $(tr[i]).show();
            }
            else if(($(td3).text().toUpperCase()) === os && ($(td2).text().toUpperCase()) === brand)
            {
              $(tr[i]).show();
            }
            else{
              $(tr[i]).hide();
            }
            
          }
        }
          
   
   $("#content").on("click", "a", function(){
     $($(this).parent()).parent().remove();
   });

    showTable();
    showDropdown();
    showSearch();
  
});
