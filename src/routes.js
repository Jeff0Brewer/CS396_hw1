"use strict";

// const Companion = require("./schema/Companion");
// const Doctor = require("./schema/Doctor");

const express = require("express");
const router = express.Router();

function find_id(list, id){
    for(let i = 0; i < list.length; i++){
        if(list[i]._id == id){
            return list[i];
        }
    }
    return false;
}

router.route("/")
    .get((req, res) => {
        console.log("GET /");
        res.status(200).send({
            data: "App is running."
        });
    });

// ---------------------------------------------------
// Edit below this line
// ---------------------------------------------------

const data = require("../config/data.json");

router.route("/doctors")
    .get((req, res) => {
        console.log("GET /doctors");
        res.status(200).send(data.doctors);
    })
    .post((req, res) => {
        console.log("POST /doctors");
        res.status(501).send();
    });

router.route("/doctors/:id")
    .get((req, res) => {
        console.log(`GET /doctors/${req.params.id}`);
        let doctor = find_id(data.doctors, req.params.id);
        if(doctor){
            res.status(200).send(doctor);
        }
        else{
            res.status(404).send();
        }
    })
    .patch((req, res) => {
        console.log(`PATCH /doctors/${req.params.id}`);
        res.status(501).send();
    })
    .delete((req, res) => {
        console.log(`DELETE /doctors/${req.params.id}`);
        res.status(501).send();
    });

router.route("/doctors/:id/companions")
    .get((req, res) => {
        console.log(`GET /doctors/${req.params.id}/companions`);
        let comps = [];
        for(const companion of data.companions){
            if(companion.doctors.includes(req.params.id)){
                comps.push(companion);
            }
        }
        if(comps.length == 0){
            res.status(404).send();
        }
        else{
            res.status(200).send(comps);
        }
    });

// router.route("/doctors/:id/companions/longest")
//     .get((req, res) => {
//         console.log("GET /doctors/:id/companions/longest");
//         res.status(501).send();
//     });

router.route("/doctors/:id/goodparent")
    .get((req, res) => {
        console.log("GET /doctors/:id/goodparent");
        let comps = [];
        for(const companion of data.companions){
            if(companion.doctors.includes(req.params.id)){
                comps.push(companion);
            }
        }
        if(comps.length == 0){
            res.status(404).send();
        }
        else{
            res.status(200).send(comps.length == comps.filter(comp => comp.alive).length);
        }
    });

router.route("/companions")
    .get((req, res) => {
        console.log("GET /companions");
        res.status(200).send(data.companions);
    })
    .post((req, res) => {
        console.log("POST /companions");
        res.status(501).send();
    });

router.route("/companions/crossover")
.get((req, res) => {
    console.log(`GET /companions/crossover`);
    res.status(200).send(data.companions.filter(companion => companion.doctors.length > 1));
});

router.route("/companions/:id")
    .get((req, res) => {
        console.log(`GET /companions/${req.params.id}`);
        let comp = find_id(data.companions, req.params.id);
        if(comp){
            res.status(200).send(comp);
        }
        else{
            res.status(404).send();
        }
    })
    .patch((req, res) => {
        console.log(`PATCH /companions/${req.params.id}`);
        res.status(501).send();
    })
    .delete((req, res) => {
        console.log(`DELETE /companions/${req.params.id}`);
        res.status(501).send();
    });

router.route("/companions/:id/doctors")
    .get((req, res) => {
        console.log(`GET /companions/${req.params.id}/doctors`);
        let comp = find_id(data.companions, req.params.id);
        if(comp){
            res.status(200).send(data.doctors.filter(doctor => comp.doctors.includes(doctor._id)));
        }
        else{
            res.status(404).send();
        }
    });

router.route("/companions/:id/friends")
    .get((req, res) => {
        console.log(`GET /companions/${req.params.id}/friends`);
        let comp = find_id(data.companions, req.params.id);
        if(comp){
            let friends = data.companions.filter(companion => {
                for(let i = 0; i < comp.seasons.length; i++){
                    for(let j = 0; j < companion.seasons.length; j++){
                        if(comp.seasons[i] == companion.seasons[j] && comp._id != companion._id)
                            return true;
                    }
                }
                return false;
            });
            res.status(200).send(friends);
        }
        else{
            res.status(404).send();
        }
    });


//////////////////
// EXTRA CREDIT //
//////////////////
router.route("/doctors/favorites")
    .get((req, res) => {
        console.log(`GET /doctors/favorites`);
        res.status(501).send();
    })
    .post((req, res) => {
        console.log(`POST /doctors/favorites`);
        res.status(501).send();
    });

router.route("/doctors/favorites/:id")
    .delete((req, res) => {
        console.log(`DELETE /doctors/favorites/:id`);
        res.status(501).send();
    });

router.route("/companions/favorites")
    .get((req, res) => {
        console.log(`GET /companions/favorites`);
        res.status(501).send();
    })
    .post((req, res) => {
        console.log(`POST /companions/favorites`);
        res.status(501).send();
    })

router.route("/companions/favorites/:id")
    .delete((req, res) => {
        console.log(`DELETE /companions/favorites/:id`);
        res.status(501).send();
    });

module.exports = router;
