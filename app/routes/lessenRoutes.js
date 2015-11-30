var models = require('../models/leerkracht');
    module.exports = function(app, passport) {

  // ADD LES =================================
  app.post('/addLes', function(req, res, next) {
      if (!req.body.naam) {
          return res.json({ error: 'Vul aub een les naam in' });
      }

      var now = new Date();
      var curr_year = now.getFullYear();
      var curr_Month = now.getMonth() + 1;
      var curr_date = now.getDate();
      var curr_hour=now.getHours()+1;
      var curr_min=now.getMinutes()+1;
      var todayDate =  (curr_Month + "/" +  curr_date + "/" + curr_year+" "+curr_hour+":"+curr_min);

      var newLes=new models.Les();
      newLes.naam=req.body.naam;
      newLes.aangemaakt=todayDate;
      newLes.bewerkt=todayDate;

      newLes.save(function (err){
          if (err) {
               console.log('error saving new task');
               console.log(err);
           }
           else {
                 console.log('new task saved successfully');

                 models.Leerkracht.findById(req.user._id, function(err, leerkracht){

                     leerkracht.lessen.push(newLes);

                     leerkracht.save(function (err){
                         if (err) {
                         console.log('error adding new les to list');
                         console.log(err);
                         }
                         req.login(leerkracht, function(err) {
                           if (err) return next(err)

                           console.log("After relogin: ");
                           console.info(req.user);
                           return  res.json(req.user);
                         });
                     });
                 });
             };
          });


      });

      //DELETE LES =====================================================

      // delete a todo
        app.delete('/deleteLes/:les_id', function(req, res,next) {

          models.Leerkracht.findById(req.user._id, function(err, leerkracht){

              leerkracht.lessen.id(req.params.les_id).remove();

              leerkracht.save(function (err){
                  if (err) {
                  console.log('error deleting les from list');
                  console.log(err);
                  }
                  req.login(leerkracht, function(err) {
                    if (err) return next(err)

                    console.log("After relogin: ");
                    console.info(req.user);
                    return  res.json(req.user);
                  });
              });
          });


        });


};
