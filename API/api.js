var express = require('express');
var router = express.Router();
var db = require('../models');
var {outboxFormatter} = require('../util/formatter');

const Op = db.Sequelize.Op;

/* GET home page. */
router.get('/articles', function(req, res, next) {
  console.log("HERE");
  res.send("HAHA GOOD JOB!").status(200).end();
});

router.post('/communication', function(req, res, next) {
  db.Communication.create({
    subject: req.body.subject,
    body: req.body.body,
    senderId: req.body.senderId
  })
  .then(function(newCommunciation) {
    res.status(200).end();
  })
  .catch(function(err) {
    if (err) {
      res.status(500).end();
      throw err;
    }
  })
});

router.post('/sendcommunication', function(req, res, next) {
  let recipients = [];
  db.Communication.findById(req.body.communicationId)
  .then(function(communication) {
    for(let i = 0; i < req.body.recipients.length; i++) {
      recipients.push({
        recipientId: req.body.recipients[i],
        unread: true
      });
    }
    db.SentCommunication.bulkCreate(recipients)
    .then(function(sentCommunications) {
      communication.setSentCommunications(sentCommunications);
      res.status(200).end();
    })
    .catch(function(err) {
      if (err) {
        res.status(500).end();
        throw err;
      }
    });
  });
});

router.get('/outbox/:userId', function(req, res, next) {
  db.User.findById(req.params.userId)
  .then(function(user) {
    user.getCommunications({
      include: [
        {
          model: db.SentCommunication,
          attributes: ['recipientId'],
          include: [
            {
              model: db.User,
              attributes: ['id', 'username']
            }
          ]
        }
      ]
    })
    .then(function(communications) {
      outboxFormatter(communications,function (formattedCommunications){
        // console.log(formattedCommunications);
        res.status(200).send(formattedCommunications).end();
      });
    })
    .catch(function(err) {
      if (err) {
        res.status(500).end();
        throw err;
      }
    });
  });
});

router.get('/inbox/:userId', function(req, res, next) {
  db.SentCommunication.findAll({
    include: [
      {
        model: db.Communication,
        include: [
          {
            model: db.User,
            attributes: ['id', 'username']
          }
        ]
      }
    ],
    where: {
      recipientId: req.params.userId
      
    }
  })
  .then(function(results) {
    res.status(200).send(results).end();
  })
  .catch(function(err) {
    if (err) {
      res.status(500).end();
      throw err;
    }
  });
});

router.post('/classroom', function(req, res, next) {
  // Create the classroom
  db.Classroom.create({
    subject: req.body.subject,
    period: req.body.period,
    grade: req.body.grade,
    schoolyear: req.body.schoolyear
  })
  .then(function(savedClassroom) {
    // Find user by id
    db.User.findById(req.body.teacherId)
    .then(function(user) {
      savedClassroom.setInstructor(user);
      res.status(200).end();
    })
    .catch(function(err) {
      if (err) {
        res.status(500).end();
        throw err;
      }
    });
  })
  .catch(function(err) {
    if (err) {
      res.status(500).end();
      throw err;
    }
  });
});

router.get('/classroom/:classId', function(req, res, next) {
  db.Classroom.findById(req.params.classId, {
    include: [
      {
        model: db.User,
        as: 'instructor',
        attributes: ['username']
      }
    ]
  })
  .then(function(classroom) {
    res.status(200).send(classroom).end();
  })
  .catch(function(err) {
    if (err) {
      res.status(500).end();
      throw err;
    }
  });
});

router.post('/addparticipant', function(req, res, next) {
  db.Participant.create({
    userEmail: req.body.userEmail,
    ClassroomId: req.body.classroomId
  })
  .then(function(newParticipant) {
    res.status(200).end();
  })
  .catch(function(err) {
    if (err) {
      res.status(500).end();
      throw err;
    }
  });
});

router.get('/classroombyuser/:userId', function(req, res, next) {
  db.User.findById(req.params.userId)
  .then(function(user) {
    db.Participant.findAll({
      include: [
        {
          model: db.Classroom,
          include: [
            {
              model: db.User,
              as: 'instructor',
              attributes: ['username']
            }
          ]
        }
      ],
      where: {
        userEmail: user.email
      }
    })
    .then(function(classrooms) {
      res.status(200).send(classrooms).end();
    })
    .catch(function(err) {
      if (err) {
        res.status(500).end();
        throw err;
      }
    });
  })
  .catch(function(err) {
    if (err) {
      res.status(500).end();
      throw err;
    }
  });
});

router.post('/addassignment', function(req, res, next) {
  db.Assignment.create({
    lessondate: req.body.lessondate,
    link: req.body.link,
    topics: req.body.topics,
    homework: req.body.homework,
    duedate: req.body.duedate,
    ClassroomId: req.body.classroomId
  })
  .then(function(newAssignment) {
    res.status(200).end();
  })
  .catch(function(err) {
    if (err) {
      res.status(500).end();
      throw err;
    }
  });
});

router.get('/assignmentsbyclass/:classroomId', function(req, res, next) {
  db.Classroom.findById(req.params.classroomId)
  .then(function(classroom) {
    classroom.getAssignments()
    .then(function(assignments) {
      res.status(200).send(assignments).end();
    })
    .catch(function(err) {
      if (err) {
        res.status(500).end();
        throw err;
      }
    });
  })
  .catch(function(err) {
    if (err) {
      res.status(500).end();
      throw err;
    }
  });
})

module.exports = router;