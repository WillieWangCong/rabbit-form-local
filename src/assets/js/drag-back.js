Vue.directive('drag', {
  bind: function (el, binding) {
    var obj = $(el);
    var objClone = obj.clone();
    var area = null;
    var cptShow = binding.value.cptShow;
    var phObj = {}
    phObj.isPlaceholder = false;
    /* 数组排序 */
    function sortNumber(a, b) {
      return a.y - b.y
    }
    obj.on('mousedown.drag', function (event) {
      var evt = event || window.event;
      evt.preventDefault();
      area = $('.drag_area');
      area.sx = area.offset().left;
      area.sy = area.offset().top;
      area.ex = area.offset().left + area.outerWidth();
      area.ey = area.offset().top + area.outerHeight();
      obj.addClass('dragFrost');
      objClone.sx = obj.offset().left;
      objClone.sy = obj.offset().top;
      objClone.addClass('dragStart').css({
        width: obj.outerWidth() + 'px',
        height: obj.outerHeight() + 'px',
        x: evt.clientX,
        y: evt.clientY,
        left: evt.clientX - obj.outerWidth() / 2,
        top: evt.clientY - obj.outerHeight() / 2,
      }).appendTo('body');

      $(document).on('mousemove.drag', function (event) {
        var evt = event || window.event;
        evt.preventDefault();
        objClone.css({
          x: evt.clientX,
          y: evt.clientY,
          left: evt.clientX - obj.outerWidth() / 2,
          top: evt.clientY - obj.outerHeight() / 2,
        });
        objClone.x = evt.clientX - obj.outerWidth() / 2;
        objClone.y = evt.clientY - obj.outerHeight() / 2;
        var x = evt.clientX - obj.outerWidth() / 2;
        var y = evt.clientY - obj.outerHeight() / 2;

        for (var i in cptShow) {
          if (cptShow[i].cpt == 'rabbit-placeholder') {
            phObj.isPlaceholder = true;
            break;
          }
        }

        if (x >= area.sx && x <= area.ex && y >= 0 && y <= area.ey) {
          if (phObj.isPlaceholder) {
            /* 交换位置 */
            for (let i = 0; i < cptShow.length; i++) {
              if (cptShow[i].cpt == phObj.cpt) {
                continue;
              }
              if (objClone.y >= cptShow[i].y) { //在i之后插入                
                phObj.y = $('.col_middle .drag_area > li').eq(i).outerHeight() + cptShow[i].initialY;
                for (let j = 0; j <= i; j++) {
                  if (cptShow[j].cpt == phObj.cpt) {
                    continue;
                  }
                  cptShow[j].y = cptShow[j].initialY;
                }
                for (let k = i + 1; k < cptShow.length; k++) {
                  if (cptShow[k].cpt == phObj.cpt) {
                    continue;
                  }
                  cptShow[k].y = cptShow[k].initialY + $('.col_middle .rabbit_placeholder').eq(0).outerHeight();
                }
                cptShow.sort(sortNumber);
              } else if (objClone.y < cptShow[0].y) { //在第一个之前插入
                phObj.y = $('.col_middle .drag_area > li').eq(0).offset().top;
                for (let k = 0; k < cptShow.length; k++) {
                  if (cptShow[k].cpt == phObj.cpt) {
                    continue;
                  }
                  cptShow[k].y = cptShow[k].initialY + $('.col_middle .rabbit_placeholder').eq(0).outerHeight();
                }


                cptShow.sort(sortNumber);
              }
            }
          } else {
            /* 添加新占位 */
            phObj = {
              cpt: 'rabbit-placeholder',
              y: '',
              initialY: ''
            }
            cptShow.push(phObj); //占位加入末尾            
            setTimeout(function () {
              phObj.y = $('.rabbit_placeholder').offset().top; //给予初始位置
              phObj.initialY = $('.rabbit_placeholder').offset().top; //给予初始位置
            }, 0);
            phObj.isPlaceholder = true;
          }
        } else {
          /* 越界移除占位 */
          for (let i in cptShow) {
            if (cptShow[i].cpt == 'rabbit-placeholder') {
              cptShow.splice(i, 1);
              phObj.isPlaceholder = false;
              break;
            }
          }
        }
      });

      $(document).on('mouseup.drag', function (event) {

        var evt = event || window.event;
        evt.preventDefault();
        var x = evt.clientX - obj.outerWidth() / 2;
        var y = evt.clientY - obj.outerHeight() / 2;

        if (x >= area.sx && x <= area.ex && y >= 0 && y <= area.ey) {


          /* 用新加组件替换占位组件 */
          for (let i = 0; i < cptShow.length; i++) {
            if (cptShow[i].cpt == phObj.cpt) {
              var cptReal = binding.value.show(binding.value.index); //向cptShow中push一个组件名
              cptShow.splice(i, 1, cptReal);
              cptShow[i].y = phObj.y;
              cptShow[i].initialY = phObj.initialY;
              phObj.isPlaceholder = false;
              break;
            }
          }

          /* 初始化cptShow */
          setTimeout(function () {
            for (let i = 0; i < $('.col_middle .drag_area > li').length; i++) {
              cptShow[i].initialY = cptShow[i].y = $('.col_middle .drag_area > li').eq(i).offset().top;
            }
          }, 0)



          objClone.removeClass('dragStart dragEnd');
          objClone.remove();
        } else {
          objClone.addClass('dragEnd').css({
            x: evt.clientY,
            y: evt.clientX,
            left: objClone.sx,
            top: objClone.sy
          });
          setTimeout(function () {
            objClone.removeClass('dragStart dragEnd');
            objClone.remove();
          }, 300);
        }

        $(document).off('mousemove.drag');
        $(document).off('mouseup.drag');
        obj.removeClass('dragFrost');
      });
    });

  }
});
