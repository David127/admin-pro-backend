const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

  const hospitales = await Hospital.find()
                                  .populate('usuario', 'nombre img');

  return res.json({
    ok: true,
    hospitales
  });
}

const crearHospital = async (req, res = response) => {

  const uid = req.uid;
  const hospital = new Hospital({
    usuario: uid,
    ...req.body
  });

  try {

    const hospitalDB = await hospital.save();

    return res.json({
      ok: true,
      hospital: hospitalDB
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }

}

const actualizarHospital = (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'actualizarHospital'
  });
}

const borrarHospital = (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'borrarHospital'
  });
}

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital
}