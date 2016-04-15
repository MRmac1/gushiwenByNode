/**
 * Created by mr_mac1 on 16/4/15.
 */
var spiderDB = require('./spiderDB');
var record = {
    url: 'http://so.gushiwen.org/view_71137.aspx',
    title: '桃花源记',
    author: '陶渊明',
    authorUrl: '/author_645.aspx',
    originalText: '　　晋太元中，武陵人捕鱼为业。缘溪行，忘路之远近。忽逢桃花林，夹岸数百步，中无杂树，芳草鲜美，落英缤纷，渔人甚异之。复前行，欲穷其林。　　林尽水源，便得一山，山有小口，仿佛若有光。便舍船，从口入。初极狭，才通人。复行数十步，豁然开朗。土地平旷，屋舍俨然，有良田美池桑竹之属。阡陌交通，鸡犬相闻。其中往来种作，男女衣着，悉如外人。黄发垂髫，并怡然自乐。　　见渔人，乃大惊，问所从来。具答之。便要还家，设酒杀鸡作食。村中闻有此人，咸来问讯。自云先世避秦时乱，率妻子邑人来此绝境，不复出焉，遂与外人间隔。问今是何世，乃不知有汉，无论魏晋。此人一一为具言所闻，皆叹惋。余人各复延至其家，皆出酒食。停数日，辞去。此中人语云：“不足为外人道也。”(间隔 一作：隔绝)　　既出，得其船，便扶向路，处处志之。及郡下，诣太守，说如此。太守即遣人随其往，寻向所志，遂迷，不复得路。　　南阳刘子骥，高尚士也，闻之，欣然规往。未果，寻病终，后遂无问津者。',
    fanyiUrls:
        [ 'http://so.gushiwen.org/fanyi_1540.aspx',
            'http://so.gushiwen.org/fanyi_1541.aspx' ],
    shangxiUrls:
        [ 'http://so.gushiwen.org/shangxi_2179.aspx',
            'http://so.gushiwen.org/shangxi_2178.aspx',
            'http://so.gushiwen.org/shangxi_2177.aspx',
            'http://so.gushiwen.org/shangxi_13715.aspx' ]
};
spiderDB.addResult(record);
