function addMusteri() {
  postData('/ajax/addmusteri',{
      musteri:getOValue('musteri'),
      title:getOValue('title'),
      vergidairesi:getOValue('vergidairesi'),
      verginumarasi:getOValue('verginumarasi'),
      adres:getOValue('adres'),
      risk:getOValue('risk'),
      vade:getOValue('vade')
    },
    function(retVal){
      alert('Kaydedildi');
      window.location.href='/list/musteri';
    });
}