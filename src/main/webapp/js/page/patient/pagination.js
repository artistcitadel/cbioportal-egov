/**
 * @author 오세영
 */
function Pager() {
    var self = this;
    self.buildPage = function (page, total, el, callback, data, node) {
        self.tPage = total;
        self.el = el;
        self.callback = callback;
        self.data = data;
        self.node = node;
        generate(page);
    }

   var generate = function (page) {
        var totalPage = self.tPage;
        // console.log('totalpage ', totalPage);
        var prev = '<a style="cursor:pointer;" class="btn_first">처음</a>';
        var next = '<a style="cursor:pointer;" class="btn_last">마지막</a>';
        var before = '<a style="cursor:pointer;" class="btn_prev">이전</a>';
        var after = '<a style="cursor:pointer;" class="btn_next">다음</a>';
        var str = buildCount(totalPage, page);
        var id = self.el.prop('id');
       $("#"+id+" > *").remove();
        if (totalPage > 1) {
            // console.log("self.el ",self.el);
            self.el.append(prev);
            self.el.append(before);
            self.el.append(str);
            self.el.append(after);
            self.el.append(next);
        }
        if (totalPage === 1) self.el.append(str);

        //$('.pi').on('click',function (e) {
       $('.pi').on('click',function (e) {
           e.stopImmediatePropagation();
            //var page = Number($(this).attr("id")) - 1;
            var page = Number($(this).attr("id"));
            showProgress(page);
        });
        $('.btn_first').on('click', function () {
            showProgress(1);
            //generate(1);
        });
        $('.btn_last').on('click', function () {
            //generate(totalPage);
            showProgress(totalPage);
        });
        $('.btn_prev').on('click', function () {
            //generate(page - 1);
            showProgress(page - 1);
        });
        $('.btn_next').on('click', function () {
            //generate(page + 1);
            showProgress(page+1);
        });
    }

    var showProgress = function(page){
        if(self.node==='simple'){
            self.callback.movePage(page);
            return;
        }
      self.callback.showPageBuild(self.data, page, self.node);
      generate(page);
    }

    var buildCount = function (totalPage, page) {
        // console.log(totalPage, page);
        var sidx = 1, eidx = 10, track=10;
        sidx = page / track;
        sidx = Math.floor(sidx) * track + 1;
        eidx = sidx + track-1;
        eidx = (eidx < totalPage) ? eidx : totalPage;

        //console.log("sidx ", sidx);
        //console.log("edix " , eidx);
        var str = '';
        for (var i = sidx; i <= eidx; i++) {
            //str += '<a style="cursor:pointer;" class="pi" id="'+i+'">'+i+'</a>';
            if (i === page)
                str += '<em>' + i + '</em>';
            else
                str += '<a style="cursor:pointer;" class="pi" id="' + i + '">' + i + '</a>';
        }
        return str;
    }
}