let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';

let tmp;  // tmp هنا 
// بمعني المتغير الوهمي الذي يكون بديل ال 
//  i لاننا لا نستطيع استعاء الانديكس فوق  عملنا متغير جلوبال  بحسث يكون مرئ لكل الفانكشينز 
//console.log(title,price,taxes,ads,discount,total,count,category,submit)
//1- get total
function getTotal() {
	if(price.value != ''){
		let result = (+price.value + +taxes.value + +ads.value) - +discount.value;  // الكود لازم نضيف جنب كل حاجة علامة + لتحويل الي رقم 
		total.innerHTML = result;
		total.style.background = '#040';
	}else{
		total.innerHTML = '';  //لتفضية الخانات بعد الانتهاء 
		total.style.background = '#a00d02'; // لتحويل الزر التوتال للون الاحمر عندما لايكون هناك بيانات في مستطيل السعر
	}
}



// 2- create product
let dataPro;
if(localStorage.product != null) {
	dataPro = JSON.parse(localStorage.product) // لو اللوكل ستورج فيها بيانات اعرضلي وضيفلي في الداتا برو 
}else{
	dataPro = [];  // لو مفهاش بيانات خليها اراي فاضية 
}
//let dataPro = []; // المكان الموجود فيه الداتا
submit.onclick = function() {
	let newPro = {
		title:title.value.toLowerCase(),
		price:price.value,
		taxes:taxes.value,
		ads:ads.value,
		discount:discount.value,
		total:total.innerHTML,  // لانه small و ليس فاليوا 
		count:count.value,
		category:category.value.toLowerCase(),
	}
	if(title.value != ''
		 && price.value != '' 
		 && category.value != ''
		&& newPro.count < 100){
		 
		if(mood === 'create') {
	
			if(newPro.count > 1) {
				for(let i = 0; i < newPro.count; i++) {
		
					dataPro.push(newPro);   // لدفع و انشاء منتج واحد بيانات داخل الاراي الجديد 
				}
			}else{
				dataPro.push(newPro);
			}
		}else{
			dataPro[ tmp ] = newPro;
			mood = 'create';
			submit.innerHTML = 'Create';
			count.style.display = 'block';
		} 
		clearData()
	}
	
	 // 3- save localstorage
	localStorage.setItem('product', JSON.stringify(dataPro))   // لمنع حذف البيانات عند عمل ريفريش 
	//console.log(dataPro)   // للاحتفاظ بالبيانات لعرضها للاراي الجديد 
   // clearData()
	showData()
}



// 4- clear inputs 
function clearData() {      // لتفضية الانبوت 
    title.value = '';  // لتفضية حقل التايتل 
	price.value = '';
	taxes.value = '';
	ads.value = '';
	discount.value = '';
	total.innerHTML = '';
	count.value = '';
	category.value = '';

}
// 5- read 
function showData() {  // لما يكون عندي اري فيه داتا فبنعمل عليه لوب 
	getTotal()
	let table = '';
	for(let i = 0; i < dataPro.length; i++) {
		//table = dataPro[i]; لاننا كده بنضيف في ال html
		//  و ده غلط لازم نعمل التابل بالباك تيك و نحظ العناصر من 
		// ال html 
      // الخطوة الصح اللي تحت دي 
	  table += `
	  <tr>
						<td>${i+1}</td>
						<td>${dataPro[i].title}</td>
						<td>${dataPro[i].price}</td>
						<td>${dataPro[i].taxes}</td>
						<td>${dataPro[i].ads}</td>
						<td>${dataPro[i].discount}</td>
						<td>${dataPro[i].total}</td>
						<td>${dataPro[i].category}</td>
						<td><button onclick="updateData(${i})" id="update">update</button></td>
						<td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
					</tr>
	  
	  `
	}

	document.getElementById('tbody').innerHTML = table;
	let btnDelete = document.getElementById('deleteAll');
	
	if(dataPro.length > 0) {
		btnDelete.innerHTML = `
		<button onclick="deleteAll()">delete All (${dataPro.length})</button>
		`
		//7 - count لاضافة اي عدد منتجات 

	}else{
		btnDelete.innerHTML = '';
	}

}
   showData()

   // 6- delete 
   function deleteData(i) {
	   //console.log(i)
	   dataPro.splice(i,1);
	   localStorage.product = JSON.stringify(dataPro);
	   showData()
	}
	function deleteAll() {
		localStorage.clear() // تتحذف من اللوكل استورج فقط للحذف من الاراي و اللوكل ستورج نعمل الخطوة اللي جاية 
		dataPro.splice(0)
		showData() // لتحديث الداتا 
	}

 // 8- update 
 function updateData(i) { 
	//console.log(i)
	title.value = dataPro[i].title;
	price.value = dataPro[i].price;
	taxes.value = dataPro[i].taxes;
	ads.value = dataPro[i].ads;
	discount.value = dataPro[i].discount;
    getTotal()
	count.style.display = 'none';

	category.value = dataPro[i].category;
	submit.innerHTML = 'Update';
	mood ='update';
	tmp = i;  // و بكده الانديكس اصبحت مكشوفة لكل الفانكشينز 
    scroll({
		top:0,
		behavior:'smooth',
	})
}


 // 9- search
 let searchMood = 'title';
 function getSearchMood(id){
   let search = document.getElementById('search');
	if(id == 'searchTitle'){
		searchMood = 'title';
		//search.placeholder = 'Search By Title';
	}else{
		searchMood = 'category';
		//search.placeholder = 'Search By Category';
	}
	search.placeholder = 'Search By'+ searchMood;
	search.focus()
	search.value = '';
	showData()
 }
 function searchData(value) {
	let table = '';
   if(searchMood == 'title'){
    for(let i = 0; i < dataPro.length; i++){
		if(dataPro[i].title.toLowerCase().includes(value.toLowerCase())){
			table += `
	  <tr>
						<td>${i}</td>
						<td>${dataPro[i].title}</td>
						<td>${dataPro[i].price}</td>
						<td>${dataPro[i].taxes}</td>
						<td>${dataPro[i].ads}</td>
						<td>${dataPro[i].discount}</td>
						<td>${dataPro[i].total}</td>
						<td>${dataPro[i].category}</td>
						<td><button onclick="updateData(${i})" id="update">update</button></td>
						<td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
					</tr>
	  
	  `
		}
	}
   }else{
        for(let i = 0; i < dataPro.length; i++){
		if(dataPro[i].category.includes(value.toLowerCase())){
			table += `
	  <tr>
						<td>${i}</td>
						<td>${dataPro[i].title}</td>
						<td>${dataPro[i].price}</td>
						<td>${dataPro[i].taxes}</td>
						<td>${dataPro[i].ads}</td>
						<td>${dataPro[i].discount}</td>
						<td>${dataPro[i].total}</td>
						<td>${dataPro[i].category}</td>
						<td><button onclick="updateData(${i})" id="update">update</button></td>
						<td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
					</tr>
	  
	  `
		}
	}
   }
   document.getElementById('tbody').innerHTML = table;
 }
 // 10- clean data لمنع ارسال اي انبوت فارغ 

