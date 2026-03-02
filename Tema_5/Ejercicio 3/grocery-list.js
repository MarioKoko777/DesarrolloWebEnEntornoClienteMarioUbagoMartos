 const $ = s => document.querySelector(s);
    const listEl = $("#grocery-list");
    const inputEl = $("#grocery-input");
    const formEl = $("#grocery-form");
    const clearBtn = $("#clear-btn");
    const emptyMsg = $("#empty-msg");
    const submitBtn = $("#submit-btn");
    let items = [];
    let editingId = null;

    function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
    function save(){localStorage.setItem("grocery-items", JSON.stringify(items))}
    function load(){try{items = JSON.parse(localStorage.getItem("grocery-items"))||[]}catch{items=[]}}
    function setMode(mode){
      if(mode==="add"){editingId=null; submitBtn.textContent="Submit"}
      else{submitBtn.textContent="Guardar"}
    }
    function render(){
      listEl.innerHTML="";
      if(items.length===0){
        emptyMsg.style.display="";
        clearBtn.hidden=true;
        return;
      }
      emptyMsg.style.display="none";
      clearBtn.hidden=false;
      for(const item of items){
        const li = document.createElement("li");
        const text = document.createElement("span");
        text.className="item-text";
        text.textContent=item.text;
        const actions = document.createElement("div");
        actions.className="actions";
        const edit = document.createElement("button");
        edit.className="icon edit";
        edit.type="button";
        edit.title="Editar";
        edit.setAttribute("aria-label","Editar");
        edit.textContent="✏️";
        edit.addEventListener("click", ()=>{
          inputEl.value=item.text;
          editingId=item.id;
          setMode("edit");
          inputEl.focus();
        });
        const del = document.createElement("button");
        del.className="icon delete";
        del.type="button";
        del.title="Eliminar";
        del.setAttribute("aria-label","Eliminar");
        del.textContent="🗑️";
        del.addEventListener("click", ()=>{
          items = items.filter(i=>i.id!==item.id);
          save(); render();
        });
        actions.append(edit, del);
        li.append(text, actions);
        listEl.append(li);
      }
    }
    formEl.addEventListener("submit", e=>{
      e.preventDefault();
      const value = inputEl.value.trim();
      if(!value) return;
      if(editingId){
        const i = items.findIndex(x=>x.id===editingId);
        if(i!==-1) items[i].text = value;
        setMode("add");
      }else{
        items.push({id:uid(), text:value});
      }
      inputEl.value="";
      save(); render();
    });
    clearBtn.addEventListener("click", ()=>{
      items = [];
      save(); render();
    });
    load(); render();