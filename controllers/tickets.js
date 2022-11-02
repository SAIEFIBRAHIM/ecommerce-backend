const Tickets = require("../models/tickets");
const Users = require("../models/users");

exports.addTicket = (req, res, next) => {
  const ticket = new Tickets({ ...req.body });
  ticket
    .save()
    .then((data) => {
      res.status(201).json({ success: true, data: data });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ success: false, err: error });
    });
};
exports.getAllTickets = (req, res, next) => {
  Tickets.find()
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ success: false, err: error });
    });
};
exports.getTicket = (req, res, next) => {
  Tickets.findById(req.params.id)
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ success: false, err: error });
    });
};
exports.getOwnAllTickets = async (req, res, next) => {
  await Users.findOne({ username: req.params.username })
    .then(async (data) => {
      await Tickets.find({ user: data._id })
        .then((result) => {
          res.status(200).json({ success: true, data: result });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({ success: false, err: err });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ success: false, err: error });
    });
};
exports.getOwnTicket = async (req, res, next) => {
  await Users.findOne({ username: req.params.username })
    .then((data) => {
      Tickets.findById(req.params.id)
        .then((found) => {
          if (found.user === data._id) {
            res.status(200).json({ success: true, data: result });
          } else {
            res.status(401).json({
              success: false,
              msg: "This ticket doesn't belong to you",
            });
          }
        })
        .catch((pob) => {
          console.log(pob);
          res.status(400).json({ success: false, err: pob });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ success: false, err: error });
    });
};
exports.updateTicket = (req, res, next) => {
  Tickets.findByIdAndUpdate(req.params.id, { ...req.body })
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ success: false, err: error });
    });
};
exports.updateOwnTicket = async (req, res, next) => {
  await Users.findOne({ username: req.params.username })
    .then((data) => {
      Tickets.findById(req.params.id)
        .then((found) => {
          if (found.user === data._id) {
            Tickets.findByIdAndUpdate(req.params.id, { ...req.body })
              .then((result) => {
                res.status(200).json({ success: true, data: result });
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json({ success: false, err: err });
              });
          } else {
            res.status(401).json({
              success: false,
              msg: "This ticket doesn't belong to you",
            });
          }
        })
        .catch((pob) => {
          console.log(pob);
          res.status(400).json({ success: false, err: pob });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ success: false, err: error });
    });
};

exports.deleteTicket = (req, res, next) => {
  Tickets.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ deleted: true });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ deleted: false, err: error });
    });
};
