const Service = require('egg').Service;

let tag = 0;

function getDbData(){
  let list = []
  let i = 1
  for(;i<=20;i++){
      list.push({
          id:i,
          title:`demo title ${i}-${tag}`,
          sectitle:'北京时间3月17日讯 NBA常规赛掘金主场迎来步行者的挑战，近来两队状态均不错取得2连胜'+tag,
          icon:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552392457627&di=7d9687517041ecdc41338b729e9df12f&imgtype=0&src=http%3A%2F%2Fp2.qhmsg.com%2Ft011b62617e1ae1685d.png',
          content:'北京时间3月17日讯 NBA常规赛掘金主场迎来步行者的挑战，近来两队状态均不错取得2连胜，掘金紧追勇士排名西部第二。开场后步行者就展现出不错手感，不断在中远距离投篮命中，而掘金则依靠约基奇在内线的大杀四方追赶比分，不过步行者多人开花仍旧取得11分领先优势。第二节虽然比斯利上来就是两记三分，但步行者整体发挥更为强打一度将领先优势扩大到18分，好在通过内线进攻的牵引，掘金外线球员也逐渐找回手感，上半场结束前掀起一波反扑在半场结束时掘金57-60将分差缩小到3分。第三节回来两队命中率下降并且多次出现失误，场上比分也处于胶着状态，不过掘金通过内线优势将比分反超。第四节两队命中率仍旧不高，掘金通过内线强势发挥一度领先到10分，不过约基奇争抢篮板时犯规不满判罚连吃2T被罚出场，步行者也趁机利用罚球缩小分差，不过还好米尔萨普最后时刻上篮打进，最终掘金100-96逆转战胜步行者取得3连胜继续保持对勇士的压力。',
          user:`user ${i}`   
        })
  }
  tag++;
  return list;
}
class VideoService extends Service {
  async getData() {
    let list = getDbData();
    return {
        error:0,
        list
    }
  }
  async getDetail(id) {
    let l = getDbData();
    let o = l.find(item => {
      return item.id == id;
    })
    return {
        error:0,
        data:o
    };
  }
}

module.exports = VideoService;