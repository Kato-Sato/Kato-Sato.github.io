$(function(){
    const config = {
        ID : 0,
        DATE : 1,
        TYPE : 2,
        DETAIL : 3,
        AMOUNT : 4,
        CREDITCARD : 5,
        CATEGORY : 6,
        TAG : 7,
        OUTACCOUNT : 8,
        INACCOUNT : 9,
        REMARKS : 10
    };
    const BILL = {
        STARTDATE: 0,
        PAYMENTDATE: 1,
        AMOUNT: 2,
        DETAIL: 3
    };
    let accountInitial = { // 保存
        "財布": 649,
        "Olive": 5,
        "特別費": 18889,
        "suica": 910,
        "PASMO": -1067, // PASMO 使用履歴不明
        "paypay": 131
    };
    let list = [ // 保存
        // ID，年月日，取引形態，内容，金額，クレジット，項目，タグ，出金口座，入金口座，備考
        [-1, 20260301, '収入', '初期', 20000, null, '仕送り', null, null, '財布', null],
        [-1, 20260301, '収入', '初期', 30000, null, '仕送り', null, null, '特別費', null],
        [0, 20260330, '支出', '新入生招集[神田->渋谷]', 209, null, '特別', '新生活', 'suica', null, null],
        [0, 20260330, '支出', '新入生招集[渋谷->駒場東大前]', 140, null, '特別', '新生活', 'suica', null, null],
        [1, 20260330, '支出', '逆評定', 400, null, '特別', '新生活', '財布', null, null],
        [2, 20260330, '支出', 'メジャー', 818, null, '特別', '新生活', '財布', null, null],
        [3, 20260330, '支出', '夕食', 1370, null, '食事', null, '財布', null, null],
        [4, 20260330, '支出', 'お茶', 195, null, '食事', null, '財布', null, null],
        [0, 20260330, '支出', '移動[駒場東大前->渋谷]', 140, null, '特別', '新生活', 'suica', null, null],
        [0, 20260330, '支出', '新入生招集[渋谷->神田]', 209, null, '特別', '新生活', 'suica', null, null],
        [5, 20260331, '支出', '入居[小川町->新代田]', 410, null, '特別', '新生活', '財布', null, null],
        [6, 20260331, '支出', '買い物[新代田<->渋谷]', 280, null, '特別', '新生活', '財布', null, null],
        [7, 20260331, '支出', 'シャチハタ', 1430, null, '特別', '新生活', '財布', null, null],
        [8, 20260331, '支出', '傘', 1310, null, '特別', '新生活', '財布', null, null],
        [9, 20260331, '支出', 'ハサミ・カッター', 1166, null, '特別', '新生活', '財布', null, null],
        [10, 20260331, '支出', 'トイレットペーパー・ティッシュ', 898, null, '特別', '新生活', '財布', null, null],
        [11, 20260331, '支出', '紙コップ', 110, null, '特別', '新生活', '財布', null, null],
        [12, 20260331, '支出', '夕食', 800, null, '食事', null, '財布', null, null],

        [0, 20260401, '収入', '4月分', 60000, null, '仕送り', null, null, '財布', null],
[13, 20260401, '支出', 'プレオリ[新代田->駒場東大前]', 140, null, '特別', '新生活', '財布', null, null],
[14, 20260401, '支出', '健康診断再検査', 820, null, '医療', null, '財布', null, null],
[15, 20260401, '支出', '定期デポジット', 500, null, '特別', '新生活', '財布', null, null],
[16, 20260401, '支出', '定期', 5330, null, '固定', null, '財布', null, null],
[17, 20260401, '支出', 'コインランドリー', 800, null, '日用品', null, '財布', null, null],
[18, 20260401, '支出', '夕食', 850, null, '食事', null, '財布', null, null],
[19, 20260402, '支出', 'オリ合宿参加費', 21000, null, '特別', 'オリ合宿', '特別費', null, null],
[20, 20260402, '支出', '昼食', 1199, null, '特別', 'オリ合宿', '特別費', null, null],
[21, 20260402, '支出', '貸出タオル', 200, null, '特別', 'オリ合宿', '特別費', null, null],
[22, 20260402, '支出', 'お茶', 160, null, '特別', 'オリ合宿', '特別費', null, null],
[23, 20260402, '支出', '箱根フリーパス', 6000, null, '特別', 'オリ合宿', '特別費', null, null],
[24, 20260403, '支出', '充レン', 330, null, '特別', 'オリ合宿', '特別費', null, null],
[25, 20260403, '振替', 'PASMOチャージ', 2000, null, null, null, '財布', 'PASMO', null],
[0, 20260403, '支出', '病院[小田原->下北沢]', 848, null, '雑費', null, 'PASMO', null, null],
[26, 20260403, '支出', '診断紹介状費用', 300, null, '医療', null, '財布', null, null],
[27, 20260406, '支出', 'Goodnotes', 1280, 'Olive', '教養', null, 'Olive', null, null],
[28, 20260406, '支出', '夕食', 611, null, '食事', null, '財布', null, null],
[29, 20260406, '支出', 'お茶', 170, null, '食事', null, '財布', null, null],
[30, 20260407, '支出', '再検査', 710, null, '医療', null, '財布', null, null],
[31, 20260407, '支出', '夕食', 590, null, '食事', null, '財布', null, null],
[32, 20260408, '支出', 'コインランドリー', 900, null, '日用品', null, '財布', null, null],
[33, 20260408, '支出', '夕食', 850, null, '食事', null, '財布', null, null],
[34, 20260409, '支出', '夕食', 950, null, '食事', null, '財布', null, null],
[35, 20260409, '支出', '顔写真印刷', 60, null, '教養', null, '財布', null, null],
[36, 20260410, '支出', 'ニコニコプレミアム', 790, 'Olive', '教養', null, 'Olive', null, null],
[37, 20260410, '支出', 'お茶', 207, null, '食事', null, '財布', null, null],
[38, 20260412, '収入', '帰省費', 15000, null, 'その他', null, null, '特別費', null],
[39, 20260413, '支出', 'お茶', 159, null, '食事', null, '財布', null, null],
[40, 20260414, '支出', '帰省', 15120, 'Olive', '特別', '帰省2026GW', 'Olive', null, null],
[0, 20260414, '振替', 'クレジット振込', 15000, null, null, null, '特別費', 'Olive', null],
[41, 20260414, '支出', '夕食', 590, null, '食事', null, '財布', null, null],
[42, 20260414, '支出', 'Patreon', 3306, 'Olive', '娯楽', null, 'Olive', null, null],
[43, 20260415, '支出', '授業プリント印刷', 20, null, '教養', null, '財布', null, null],
[44, 20260415, '支出', '夕食', 650, 'Olive', '食事', null, 'Olive', null, null],
[45, 20260415, '支出', 'nosh', 4372, 'Olive', '食事', null, 'Olive', null, null],
[46, 20260416, '支出', '夕食', 690, 'Olive', '食事', null, 'Olive', null, null],
[47, 20260416, '支出', 'お茶', 195, 'Olive', '食事', null, 'Olive', null, null],
[48, 20260417, '支出', '夕食', 590, null, '食事', null, '財布', null, null],
[0, 20260418, '支出', 'エレクラ新歓[新宿三->渋谷]', 178, null, '交際', '新歓', 'suica', null, null],
[49, 20260418, '支出', 'ごみ箱', 1790, null, '特別', '新生活', '財布', null, null],
[50, 20260418, '支出', '掃除用品', 440, null, '特別', '新生活', '財布', null, null],
[51, 20260418, '支出', '延長コード', 1730, null, '特別', '新生活', '財布', null, null],
[52, 20260418, '支出', '夕食', 450, 'Olive', '食事', null, 'Olive', null, null],
[53, 20260418, '支出', 'おやつ', 128, null, '娯楽', null, '財布', null, null],
[54, 20260418, '支出', '朝食', 319, null, '食事', null, '財布', null, null],
[55, 20260418, '支出', '食器用スポンジ', 206, null, '日用品', null, '財布', null, null],
[56, 20260418, '支出', 'OnlyFans', 907, 'Olive', '娯楽', null, 'Olive', null, null],
[57, 20260419, '支出', '夕食', 590, null, '食事', null, '財布', null, null],
[58, 20260420, '支出', '排水口ネット', 110, 'Olive', '日用品', null, 'Olive', null, null],
[59, 20260420, '支出', '米', 4298, null, '食事', null, '財布', null, null],
[60, 20260420, '支出', 'ラップ', 326, null, '日用品', null, '財布', null, null],
[61, 20260420, '支出', '夕食', 660, 'Olive', '食事', null, 'Olive', null, null],
[62, 20260421, '支出', '生活用品', 220, 'Olive', '日用品', null, 'Olive', null, null],
[63, 20260421, '支出', 'お茶', 170, null, '食事', null, '財布', null, null],
[64, 20260422, '支出', 'バイト面接[駒場東大前<->渋谷]', 280, 'Olive', '雑費', null, 'Olive', null, null],
[65, 20260422, '支出', '冷水筒', 299, null, '特別', '新生活', '財布', null, null],
[66, 20260423, '支出', '麻雀新歓[駒場東大前<->渋谷]', 280, 'Olive', '交際', '新歓', 'Olive', null, null],
[67, 20260423, '支出', '新歓入会・参加費', 1500, null, '交際', '新歓', '財布', null, null],
[68, 20260424, '支出', 'お茶', 159, 'Olive', '食事', null, 'Olive', null, null],
[69, 20260426, '支出', 'お茶', 159, 'Olive', '食事', null, 'Olive', null, null],
[70, 20260427, '支出', 'VOLER新歓[下北沢<->成城学園前]', 400, 'Olive', '交際', '新歓', 'Olive', null, null],
[71, 20260428, '支出', 'お茶', 159, 'Olive', '食事', null, 'Olive', null, null],
[72, 20260429, '支出', 'お茶', 159, 'Olive', '食事', null, 'Olive', null, null],
        [0, 20260429, '振替', 'クレジット振込', 17000, null, null, null, '財布', 'Olive', null],
[73, 20260430, '支出', 'STEAM', 1640, 'Olive', '娯楽', null, 'Olive', null, null],

[74, 20260501, '支出', 'コインランドリー', 800, null, '日用品', null, '財布', null, null],
[75, 20260501, '支出', '電気・ガス', 1214, null, '雑費', null, '財布', null, null],
[76, 20260501, '支出', '魚べい', 1485, null, '特別', '帰省2026GW', '財布', null, null],
[77, 20260501, '支出', '帰省[東京->神戸]', 550, 'Olive', '特別', '帰省2026GW', 'Olive', null, null],
[78, 20260502, '支出', '自転車(2日)', 160, null, '特別', '帰省2026GW', '財布', null, null],
[79, 20260502, '支出', '西神南->三宮', 380, 'Olive', '特別', '帰省2026GW', 'Olive', null, null],
[80, 20260502, '支出', '昼食', 1190, 'Olive', '特別', '帰省2026GW', 'Olive', null, null],
[81, 20260502, '支出', '神戸三宮->出町柳', 650, null, '特別', '帰省2026GW', '財布', null, null],
[82, 20260502, '振替', 'Suicaチャージ', 3000, 'Olive', null, null, 'Olive', 'suica', null],
[83, 20260502, '振替', 'paypayチャージ', 1000, null, null, null, '財布', 'paypay', null],
[84, 20260502, '支出', '夕食', 770, null, '特別', '帰省2026GW', 'paypay', null, null],
[0, 20260503, '支出', '移動[百万遍->北野天満宮]', 230, null, '特別', '帰省2026GW', 'suica', null, null],
[0, 20260503, '支出', '移動[北野天満宮->四条河原町]', 230, null, '特別', '帰省2026GW', 'suica', null, null],
[85, 20260503, '支出', '三宮->西神南', 380, 'Olive', '特別', '帰省2026GW', 'Olive', null, null],
[86, 20260505, '支出', '西神南->三宮', 380, 'Olive', '特別', '帰省2026GW', 'Olive', null, null],
[87, 20260505, '支出', '三宮->西神南', 380, 'Olive', '特別', '帰省2026GW', 'Olive', null, null],
[88, 20260506, '支出', '三ツ星ファーム', 7948, 'Olive', '食事', null, 'Olive', null, null],
[89, 20260507, '支出', '帰省[神戸->東京]', 550, 'Olive', '特別', '帰省2026GW', 'Olive', null, null],
[90, 20260507, '支出', '夕食', 844, 'Olive', '食事', null, 'Olive', null, null],
[91, 20260507, '支出', 'お茶', 341, 'Olive', '食事', null, 'Olive', null, null],
[92, 20260508, '支出', '証明写真印刷', 200, null, '雑費', null, '財布', null, null],
[93, 20260508, '支出', '説明会往復[下北沢<->新宿]', 340, 'Olive', '雑費', null, 'Olive', null, null],
[94, 20260508, '支出', 'USB', 1691, 'Olive', '日用品', null, 'Olive', null, null],
[95, 20260509, '支出', '生活用品', 660, 'Olive', '日用品', null, 'Olive', null, null],
[96, 20260509, '支出', '東京同窓会[渋谷->新代田]', 140, 'Olive', '交際', null, 'Olive', null, null],
[97, 20260509, '支出', 'エレクラ[新代田->吉祥寺]', 210, 'Olive', '交際', 'エレクラ', 'Olive', null, null],
[0, 20260509, '支出', 'エレクラ[吉祥寺->新代田]', 209, null, '交際', 'エレクラ', 'suica', null, null],
[98, 20260509, '支出', '夕食', 590, 'Olive', '食事', null, 'Olive', null, null],
[99, 20260510, '支出', '昼食', 750, 'Olive', '食事', null, 'Olive', null, null],
[100, 20260511, '支出', 'お茶', 341, 'Olive', '食事', null, 'Olive', null, null],
[101, 20260513, '支出', 'エレクラ練習[渋谷->新宿三]', 180, 'Olive', '交際', 'エレクラ', 'Olive', null, null],
[102, 20260513, '振替', 'paypayチャージ', 1000, null, null, null, '財布', 'paypay', null],
[103, 20260513, '支出', '夕食', 1044, null, '食事', '五月祭2026', 'paypay', null, null],
[104, 20260513, '支出', 'エレクラ練習[新宿->下北沢]', 170, 'Olive', '交際', 'エレクラ', 'Olive', null, null],
[105, 20260514, '支出', 'Patreon', 3267, 'Olive', '娯楽', null, 'Olive', null, null],
[105, 20260514, '支出', '手帳', 990, 'Olive', '日用品', null, 'Olive', null, null],
[106, 20260514, '支出', 'バイト面接[新代田->渋谷]', 140, 'Olive', '雑費', null, 'Olive', null, null],
[107, 20260514, '支出', 'バイト面接[渋谷->王子神谷]', 260, 'Olive', '雑費', null, 'Olive', null, null],
[108, 20260514, '支出', 'バイト面接[王子神谷->渋谷]', 260, 'Olive', '雑費', null, 'Olive', null, null],
[109, 20260514, '支出', '黒画用紙', 110, 'Olive', '交際', 'エレクラ', 'Olive', null, null],
[110, 20260514, '支出', '楽譜印刷', 60, null, '交際', 'エレクラ', '財布', null, null],
[111, 20260515, '支出', '五月祭準備[代々木公園->東大前]', 210, 'Olive', '雑費', '五月祭2026', 'Olive', null, null],
[112, 20260515, '支出', '図書館[根津->町屋]', 180, 'Olive', '雑費', '五月祭2026', 'Olive', null, null],
[113, 20260515, '支出', '五月祭準備[町屋->下北沢]', 400, 'Olive', '雑費', '五月祭2026', 'Olive', null, null],
[114, 20260515, '支出', '夕食', 590, 'Olive', '食事', null, 'Olive', null, null],
[115, 20260515, '支出', '夕食', 127, 'Olive', '食事', null, 'Olive', null, null],
[116, 20260516, '支出', '五月祭[下北沢->東大前]', 350, 'Olive', '雑費', '五月祭2026', 'Olive', null, null],
[117, 20260516, '支出', '昼食', 500, null, '食事', '五月祭2026', '財布', null, null],
[118, 20260516, '支出', '五月祭[本郷三->下北沢]', 350, 'Olive', '雑費', '五月祭2026', 'Olive', null, null],
[119, 20260516, '支出', 'ホテル移動[新代田->渋谷]', 140, 'Olive', '雑費', null, 'Olive', null, null],
[120, 20260516, '支出', 'ホテル移動[渋谷->新橋]', 253, null, '雑費', null, 'suica', null, null],
[121, 20260516, '支出', 'ホテル移動[新橋->品川]', 199, null, '雑費', null, 'suica', null, null],
[122, 20260517, '支出', 'ホテル移動[品川->新宿]', 253, null, '雑費', null, 'suica', null, null],
[123, 20260517, '支出', '移動[新宿->下北沢]', 170, 'Olive', '雑費', null, 'Olive', null, null],
[105, 20260518, '支出', 'OnlyFans', 904, 'Olive', '娯楽', null, 'Olive', null, null],
[124, 20260518, '支出', 'お茶', 159, 'Olive', '食事', null, 'Olive', null, null],
[125, 20260520, '支出', 'お茶', 170, 'Olive', '食事', null, 'Olive', null, null],
[126, 20260520, '支出', 'ちくわ', 105, 'Olive', '食事', null, 'Olive', null, null],
[127, 20260520, '支出', 'お菓子', 257, 'Olive', '食事', null, 'Olive', null, null],
[128, 20260520, '支出', '電池', 1205, 'Olive', '日用品', null, 'Olive', null, null],
[129, 20260522, '支出', 'お茶', 341, 'Olive', '食事', null, 'Olive', null, null],
[129, 20260523, '支出', 'みそきん', 322, 'Olive', '食事', null, 'Olive', null, null],
[129, 20260524, '支出', '昼食', 1400, null, '食事', null, '財布', null, null],
[129, 20260525, '支出', '五月祭赤字', 2250, null, '雑費', '五月祭2026', '財布', null, null],
[129, 20260526, '支出', 'バイト登録[下北沢->王子神谷]', 588, null, '雑費', null, 'suica', null, null],
[129, 20260526, '支出', 'バイト登録[王子神谷->代々木公園]', 252, null, '雑費', null, 'suica', null, null],
[129, 20260526, '支出', '夕食', 650, 'Olive', '食事', null, 'Olive', null, null],
[129, 20260527, '支出', '印刷', 80, null, '教養', null, '財布', null, null],
[129, 20260527, '支出', 'お茶', 341, 'Olive', '食事', null, 'Olive', null, null],
[129, 20260527, '支出', 'お菓子', 300, 'Olive', '食事', null, 'Olive', null, null],
[129, 20260527, '支出', '袋止め', 220, 'Olive', '日用品', null, 'Olive', null, null],
[129, 20260527, '収入', '6月分', 60000, null, '仕送り', null, null, '財布', null],
[129, 20260529, '振替', 'クレカ振込', 40000, null, null, null, '財布', 'Olive', null],
[129, 20260529, '支出', '夕食', 640, 'Olive', '食事', null, 'Olive', null, null],  // 本当は590円だがどこかで50円多いのでとりあえず640円
[129, 20260530, '支出', 'ランチ[下北沢->二重橋前]', 345, null, '雑費', null, 'suica', null, null],
[129, 20260530, '支出', 'ランチ[二重橋前->下北沢]', 345, null, '雑費', null, 'suica', null, null],
[129, 20260530, '収入', '残高調整', 200, null, 'その他', null, null, 'suica', null], // suica残高調整
[129, 20260530, '支出', '散髪', 3800, 'Olive', '美容', null, 'Olive', null, null],
[129, 20260530, '支出', '夕食', 740, 'Olive', '食事', null, 'Olive', null, null],
[129, 20260531, '振替', 'バイト交通費', 4000, 'Olive', null, null, 'Olive', 'suica', null],
[129, 20260531, '振替', 'バイト交通費', 4000, null, null, null, '特別費', 'Olive', null],
[129, 20260531, '支出', 'バイト[下北沢->王子神谷]', 388, null, '雑費', '通勤', 'suica', null, null],
[129, 20260531, '支出', 'バイト[王子神谷->代々木公園]', 252, null, '雑費', '通勤', 'suica', null, null],
[129, 20260531, '支出', '昼食', 850, null, '食事', null, '財布', null, null],
[129, 20260531, '支出', '夕食', 149, 'Olive', '食事', null, 'Olive', null, null],
[129, 20260601, '支出', 'サークル会費', 6500, null, '交際', null, 'Olive', null, null]

// suica 1020


    ];
    let outCategory = ["食事", "日用品", "交際", "教養", "医療", "美容", "娯楽", "雑費"]; // 保存
    let inCategory = ["アルバイト", "仕送り", "その他"]; // 保存
    let tags = ["五月祭2026", "エレクラ", "VOLER"]; // 保存
    let special = ["帰省2026GW", "帰省2026夏"]; // 保存
    let accountBalances = {};
    let outTable = {};
    let tagTable = {};
    let notagTable = {};
    let inTable = {};
    let specialTable = {};
    let creditCardAccounts = {
        "Olive": "Olive"
    };
    let billing = {
            "Olive": [ // 期間開始, 請求日, 利用額, 詳細
                [20000000, 20260426, 0, []],
                [20260330, 20260526, 0, []],
                [20260430, 20260626, 0, []],
                [20260601, 20260726, 0, []],
                [20260701, 30000000, 0, []]
            ]
        }

    function append(new_list){
        if(new_list.length != Object.keys(config).length){ // list length
            console.log("invalid length of input list: should be 11");
            return;
        }
        const [id, date, type, detail, amount, creditCard, category, tag, outAccount, inAccount, remarks] = new_list;
        if(!Number.isInteger(id)){ // ID
            console.log("invalid id: not integer");
            return;
        }
        if(!(Number.isInteger(date) && String(date).length == 8)){ // DATE
            console.log("invalid date: not 8-digit integer");
            return;
        }
        if(!(["支出", "収入", "振替"]).includes(type)){ // TYPE
            console.log("invalid type: should be 支出, 収入, or 振替");
            return;
        }
        if(!detail){ // DETAIL
            console.log("invalid detail: shouldn't be null");
            return;
        }
        if(!Number.isInteger(amount)){ // AMOUNT
            console.log("invalid amount: not integer");
            return;
        }

        if(type == "支出"){
            if( creditCard && !Object.hasOwn(creditCardAccounts, creditCard) ){ // CREDITCARD
                console.log("invalid credit card: not exist");
                return;
            }
            else if( creditCard && outAccount != creditCardAccounts[creditCard] ){ // CREDITCARD
                console.log("outAccount is not credit card account.");
                return;
            }
            if(!outCategory.includes(category)){ // CATEGORY
                console.log("invalid category: not exist");
                return;
            }
            if(tag && !tags.includes(tag) ){ // TAG
                console.log("invalid tag: not exist");
                return;
            }
            if(!Object.hasOwn(accountInitial, outAccount)){ // OUTACCOUNT
                console.log("invalid outAccount: not exist");
                return;
            }
            if(inAccount){ // INACCOUNT
                console.log("invalid inAccount: should be null");
                return;
            }
        }
        else if(type == "収入"){
            if(!inCategory.includes(category)){ // CATEGORY
                console.log("invalid category: not exist");
                return;
            }
            if(tag && !tags.includes(tag) ){ // TAG
                console.log("invalid tag: not exist");
                return;
            }
            if(outAccount){ // OUTACCOUNT
                console.log("invalid outAccount: should be null");
                return;
            }
            if(!Object.hasOwn(accountInitial, inAccount)){ // INACCOUNT
                console.log("invalid inAccount: not exist");
                return;
            }
        }
        else if(type == "振替"){
            if( creditCard && !Object.hasOwn(creditCardAccounts, creditCard)){ // CREDITCARD
                console.log("invalid credit card: not exist");
                return;
            }
            else if( creditCard && outAccount != creditCardAccounts[creditCard] ){ // CREDITCARD
                console.log("outAccount is not credit card account.");
                return;
            }
            if(category){ // CATEGORY
                console.log("invalid category: should be null");
                return;
            }
            if( tag && !tags.includes(tag) ){ // TAG
                console.log("invalid tag: not exist");
                return;
            }
            if(!Object.hasOwn(accountInitial, outAccount)){ // OUTACCOUNT
                console.log("invalid outAccount: not exist");
                return;
            }
            if(!Object.hasOwn(accountInitial, inAccount)){ // INACCOUNT
                console.log("invalid inAccount: not exist");
                return;
            }
        }
        else return;

        if(list.at(-1)[config.DATE] <= date){
            list.push(new_list);
            return;
        }
        let s = 0, e = list.length;
        let m = Math.floor((s + e) / 2);
        while(e - s > 1){
            if(list[m][config.DATE] <= date) s = m;
            else e = m;
            m = Math.floor((s + e) / 2);
        }
        list.splice(s, 0, new_list);
        return;
    }
    function year(date){
        return Math.floor(date / 10000);
    }
    function month(date){
        return Math.floor((date % 10000) / 100);
    }
    function date(date){
        return date % 100;
    }
    // append([129, 20260529, '支出', '夕食', 1000000, null, '食事', null, '財布', null, null]);
    // append([129, 20260529, '支出', '夕食', 1000000, null, '食事', null, 'Olive', null, null]);
    // append([129, 20260529, '支出', '夕食', 1000000, 'Olive', '食事', null, 'Olive', null, null]);
    // append([129, 20260529, '支出', '夕食', 1000000, 'Olive', '食事', null, 'Olive', null, null]);
    // append([129, 20260529, '支出', '夕食', 1000000, 'Olive', '食事', null, 'Olive', null, null]);
    // append([129, 20260529, '収入', '5月分', 10000, null, 'アルバイト', null, null, '特別費', null]);
    // append([129, 20260529, '振替', 'クレカ振込', 1000000, null, null, null, '財布', 'Olive', null]);
    // append([129, 20260529, '振替', 'クレカ振込', 1000000, null, null, null, '財布', 'Olive', null]);
    // append([129, 20260529, '振替', 'クレカ振込', 1000000, null, null, null, '財布', 'Olive', null]);
    // append([129, 20260529, '振替', 'クレカ振込', 1000000, null, null, null, '財布', 'Olive', null]);
    // append([129, 20260529, '振替', 'クレカ振込', 1000000, null, null, null, '財布', 'Olive', null]);
    const today = new Date();

    function makeAccountTable(){ // 先月利用今月請求分，今月利用来月請求分，現在口座残高
        const todayZero = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        const formattedToday = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
        $("#home-date-display").text(`${formattedToday}時点`);

        for(const key in accountInitial) accountBalances[key] = accountInitial[key];
        for(const transaction of list){
            const tDate = transaction[config.DATE];
            if(tDate > todayZero) continue;
            const amount = transaction[config.AMOUNT];
            const type = transaction[config.TYPE];
            const creditCard = transaction[config.CREDITCARD];
            const outAccount = transaction[config.OUTACCOUNT];
            const inAccount = transaction[config.INACCOUNT];
            if(type == "支出"){
                if(creditCard){ // クレカ
                    let billingCycle = billing[creditCard];
                    let s = 0, e = billingCycle.length;
                    let m = Math.floor((s + e) / 2);
                    while(e - s > 1){
                        if(billingCycle[m][0] <= tDate) s = m;
                        else e = m;
                        m = Math.floor((s + e) / 2);
                    }
                    billingCycle[s][2] += amount;
                    billingCycle[s][3].push(transaction);
                }else{ // 現金
                    if(outAccount in accountBalances){
                        accountBalances[outAccount] -= amount;
                    }
                }
            }else if(type == "収入"){
                if(inAccount in accountBalances){
                    accountBalances[inAccount] += amount;
                }
            }
            else if(type == "振替"){
                if(creditCard){ // クレカ
                    let billingCycle = billing[creditCard];
                    let s = 0, e = billingCycle.length;
                    let m = Math.floor((s + e) / 2);
                    while(e - s > 1){
                        if(billingCycle[m][0] <= tDate) s = m;
                        else e = m;
                        m = Math.floor((s + e) / 2);
                    }
                    billingCycle[s][BILL.AMOUNT] += amount;
                    billingCycle[s][BILL.DETAIL].push(transaction);
                }else{ // 現金
                    if(outAccount in accountBalances){ // 不要
                        accountBalances[outAccount] -= amount;
                    }
                }
                if(inAccount in accountBalances){
                    accountBalances[inAccount] += amount;
                }
            }
        }
        for(const key in creditCardAccounts){
            const outAccount = creditCardAccounts[key];
            let billingCycleIndex = 0;
            while(billing[key][billingCycleIndex][BILL.PAYMENTDATE] <= todayZero){
                accountBalances[outAccount] -= billing[key][billingCycleIndex][BILL.AMOUNT];
                billingCycleIndex++;
            }
        }
        console.log(billing);

        let accountHTML = "<tr class='table-headline'><th>口座</th><th>残高</th></tr>";
        let creditHTML = "<tr><th>クレジットカード</th><th>次回引落日</th><th>未払い利用額</th></tr>";

        for(const key in accountBalances){
            accountHTML += `<tr>
                <td class='col1'>${key}</td>
                <td class='col2 num'>${accountBalances[key]}</td>
            </tr>`;
        }
        
        for(const key in creditCardAccounts){
            let s = 0, e = billing[key].length;
            let m = Math.floor((s + e) / 2);
            while(e - s > 1){
                if(billing[key][m][BILL.STARTDATE] <= todayZero) s = m;
                else e = m;
                m = Math.floor((s + e) / 2);
            }
            const lastBillingDate = billing[key][s-1][BILL.PAYMENTDATE];
            const lastBillingStr = `${year(lastBillingDate)}/${month(lastBillingDate)}/${date(lastBillingDate)}`;
            const thisBillingDate = billing[key][s][BILL.PAYMENTDATE];
            const thisBillingStr = `${year(thisBillingDate)}/${month(thisBillingDate)}/${date(thisBillingDate)}`;
            if(lastBillingDate > todayZero){
                creditHTML += `<tr>
                    <td class='col1'>${key}</td>
                    <td class='col-date'>${lastBillingStr}</td>
                    <td class='col2 num'>${billing[key][s-1][BILL.AMOUNT]}</td>
                </tr>`;
            }
            creditHTML += `<tr>
                <td class='col1'>${key}</td>
                <td class='col-date'>${thisBillingStr}</td>
                <td class='col2 num'>${billing[key][s][BILL.AMOUNT]}</td>
            </tr>`;
        }
        
        $("#table-home-accounts").html(accountHTML);
        $("#table-home-credit").html(creditHTML);

    }
    function makeListTable(){ // list表示数 他にも直すべき箇所あり 新しい順に上から
        let listHTML = "<tr><th>日付</th><th>取引形態</th><th>内容</th><th>金額</th><th>クレジット</th><th>項目</th><th>タグ</th><th>出金口座</th><th>入金口座</th><th>備考</th></tr>";
        const displayColumns = [config.TYPE, config.DETAIL, config.AMOUNT, config.CREDITCARD, 
            config.CATEGORY, config.TAG, config.OUTACCOUNT, config.INACCOUNT, config.REMARKS
        ];
        const displayLimit = Math.min(list.length, 50);
        for(let i=list.length-1; i>=list.length-displayLimit; i--){ // list表示数
            const transaction = list[i];
            listHTML += "<tr>";
            listHTML += `<td>${year(transaction[config.DATE])}/${month(transaction[config.DATE])}/${date(transaction[config.DATE])}</td>`;
            for(const colIndex of displayColumns){
                const cellValue = transaction[colIndex] ? transaction[colIndex] : "";
                listHTML += `<td>${cellValue}</td>`
            }
            listHTML += "</tr>";
        }
        $("#table-list").html(listHTML);
    }
    function makeOutTable(){
        for(const transaction of list){
            const ymIndex = year(transaction[config.DATE]) * 12 + month(transaction[config.DATE]) - 1;
            if(!outTable[ymIndex]){
                outTable[ymIndex] = { "合計": 0 };
                notagTable[ymIndex] = { "合計": 0 };
                for(const element of outCategory){
                    outTable[ymIndex][element] = 0;
                    notagTable[ymIndex][element] = 0;
                }
            }
            if(transaction[config.TYPE] == "支出"){
                const amount = transaction[config.AMOUNT];
                const category = transaction[config.CATEGORY];
                const tagName = transaction[config.TAG];

                if(category == "特別"){
                    if(!specialTable[tagName]) specialTable[tagName] = [];
                    specialTable[tagName].push(transaction);
                }else{
                    if(tagName){
                        if(!tagTable[tagName]) tagTable[tagName] = [];
                        tagTable[tagName].push(transaction);
                    }else{
                        notagTable[ymIndex][category] += amount;
                        notagTable[ymIndex]["合計"] += amount;
                    }
                    outTable[ymIndex][category] += amount;
                    outTable[ymIndex]["合計"] += amount;
                }
            }
        }
        let outHTML = "<tr><th>年月</th>";
        for(const element of outCategory){
            outHTML += `<th>${element}</th>`;
        }
        outHTML += "<th>合計</th></tr>";
        for(const yearmonth in outTable){
            const year = Math.floor(yearmonth / 12);
            const month = (yearmonth % 12) + 1;
            outHTML += `<tr><td>${year}/${month}</td>`;
            for (const element of outCategory) {
                // ▼変更：class="clickable-cell" と data属性 を追加▼
                outHTML += `<td class="clickable-cell" data-ym="${yearmonth}" data-category="${element}">${outTable[yearmonth][element]}</td>`;
            }
            // ▼変更：合計セルにも追加▼
            outHTML += `<td class="clickable-cell" data-ym="${yearmonth}" data-category="合計">${outTable[yearmonth]["合計"]}</td></tr>`;
        }
        $("#table-out").html(outHTML);
    }
    function makeInTable(){
        for(const transaction of list){
            const ymIndex = year(transaction[config.DATE]) * 12 + month(transaction[config.DATE]) - 1;

            if(!inTable[ymIndex]){
                inTable[ymIndex] = {};
                for(const element of inCategory){
                    inTable[ymIndex][element] = 0;
                }
            }
            if(transaction[config.TYPE] == "収入"){
                inTable[ymIndex][transaction[config.CATEGORY]] += transaction[config.AMOUNT];
            }
        }
        let inHTML = "<tr><th>年月</th>";
        for(const element of inCategory){
            inHTML += `<th>${element}</th>`;
        }
        inHTML += "</tr>";
        for(const yearmonth in inTable){
            const year = Math.floor(yearmonth / 12);
            const month = (yearmonth % 12) + 1;
            inHTML += `<tr><td>${year}/${month}</td>`;
            for(const element of inCategory){
                inHTML += `<td>${inTable[yearmonth][element]}</td>`;
            }
            inHTML += "</tr>";
        }
        $("#table-in").html(inHTML);
    }
    function makeTagTable(){
        let tagHTML = "";
        for(const key in tagTable){
            tagHTML += `<div class="tagevent">`; // ID不要かも
            tagHTML += `<div class="eventtitle">${key}</div>`;
            tagHTML += `<div class="eventdetail">`;
            for(const transaction of tagTable[key]){
                tagHTML += `<p>${transaction[config.AMOUNT]}</p>`;
            }
            tagHTML += `</div></div>`;
        }
        $("#tagevent-wrapper").html(tagHTML);
    }
    function makeSpecialTable() {
        let specialHTML = "";
        
        for (const key in specialTable) {
            const transactions = specialTable[key];
            
            // イベントの総支出額を計算
            let totalAmount = 0;
            for (const t of transactions) {
                totalAmount += t[config.AMOUNT];
            }

            // アコーディオンのアイテム生成
            specialHTML += `<div class="accordion-item">`;
            
            // 常に表示されるヘッダー部分（クリック可能）
            specialHTML += `
                <div class="accordion-header">
                    <span class="event-name">${key}</span>
                    <span class="event-total">${totalAmount}</span>
                </div>
            `;
            
            // クリックで展開される詳細テーブル
            specialHTML += `<div class="accordion-content">`;
            specialHTML += `<table class="special-detail-table">`;
            specialHTML += `<tr><th>日付</th><th>内容</th><th>金額</th><th>出金口座</th></tr>`;
            
            for (const t of transactions) {
                specialHTML += `
                    <tr>
                        <td>${t[config.MONTH]}/${t[config.DATE]}</td>
                        <td>${t[config.DETAIL]}</td>
                        <td class="num">${t[config.AMOUNT]}</td>
                        <td>${t[config.OUTACCOUNT]}</td>
                    </tr>
                `;
            }
            
            specialHTML += `</table></div></div>`;
        }
        
        $("#specialevent-wrapper").html(specialHTML);
    }
    function saveJSON(){
        
    }

    makeAccountTable();
    makeListTable();
    makeOutTable();
    makeInTable();
    makeTagTable();
    makeSpecialTable();

    $(".menu-item").on("click", function(){
        $(".page").addClass("hidden")
        const targetID = $(this).data("target");
        $("#" + targetID).removeClass("hidden");
    });

    // --- 特別支出タブのアコーディオン開閉処理 ---
    $(document).on("click", ".accordion-header", function() {
        // クリックされたヘッダーの次の要素（.accordion-content）を開閉する
        $(this).next(".accordion-content").slideToggle(250);
        
        // 色を変えるためのクラスをつけ外しする
        $(this).toggleClass("active");
    });


    // 支出表のセルをクリックしたときの処理（イベント委譲）
    $(document).on("click", "#table-out .clickable-cell", function() {
        const ymIndex = parseInt($(this).data("ym"));
        const category = $(this).data("category");
        
        // 値が0の場合は何もしない（お好みで外してもOKです）
        if ($(this).text() === "0") return;
        
        showOutDetail(ymIndex, category);
    });

    // 詳細を閉じるボタン
    $(document).on("click", "#close-out-detail", function() {
        $("#out-detail-area").addClass("hidden");
    });

    // 支出の詳細リストを生成・表示する関数
    function showOutDetail(ymIndex, category) {
        const year = Math.floor(ymIndex / 12);
        const month = (ymIndex % 12) + 1;
        
        // タイトルの設定
        $("#out-detail-title").text(`${year}年${month}月 - ${category} の取引`);

        // 条件に合う取引をフィルタリング
        const filteredList = list.filter(transaction => {
            // 支出以外、または「特別」項目の場合は除外
            if (transaction[config.TYPE] !== "支出") return false;
            if (transaction[config.CATEGORY] === "特別") return false;
            
            // 年月が一致するか
            const tYmIndex = year(transaction[config.DATE]) * 12 + month(transaction[config.DATE]) - 1;
            if (tYmIndex !== ymIndex) return false;
            
            // 項目が一致するか（「合計」がクリックされた場合は全て通す）
            if (category !== "合計" && transaction[config.CATEGORY] !== category) return false;
            
            return true;
        });

        // 抽出したデータでテーブルを作る
        let detailHTML = "<tr><th>日付</th><th>内容</th><th>金額</th><th>タグ</th><th>備考</th></tr>";
        for (const t of filteredList) {
            detailHTML += `<tr>
                <td>${t[config.MONTH]}/${t[config.DATE]}</td>
                <td>${t[config.DETAIL] || ""}</td>
                <td class="num">${t[config.AMOUNT]}</td>
                <td>${t[config.TAG] || ""}</td>
                <td>${t[config.REMARKS] || ""}</td>
            </tr>`;
        }

        $("#table-out-detail").html(detailHTML);
        
        // 詳細エリアを表示し、アニメーションでスクロールさせる
        $("#out-detail-area").removeClass("hidden");
        $("html, body").animate({
            scrollTop: $("#out-detail-area").offset().top - 20
        }, 300);
    }
});
