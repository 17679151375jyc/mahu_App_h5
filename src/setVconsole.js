 export default
  class myConsole {

    constructor(id='#__vconsole'){
      this.setListenner(id)
    }

    //异步注册事件,必须在DOM构建完成后才能绑定事件，用轮询
    setListenner(id){
      let countDown = 0;
    //  const __vcon__ = document.querySelector(id);
      const t = ()=>{
       setTimeout(()=>{

       if(document.querySelector(id)){
               //注册移动事件监听
             document.querySelector(id).addEventListener('touchmove',(e)=>{
                document.querySelector(id).style.opacity = (e.changedTouches[0].clientX / 350).toFixed(2)
             })
             clearTimeout(t);

       }else {
         //5秒后如果还不能注册完就移除这个轮询
         countDown += 1;
         countDown >= 50?  clearTimeout(t) : t();
       }
      },100)
      }
         t()
    }
   //移除事件监听
    removeListener(id='#__vconsole'){
        if(document.querySelector(id)){
            document.querySelector(id).removeEventListener('touchmove',(e)=>{
                console.log("移除监听")
            })
        }
    }
  }