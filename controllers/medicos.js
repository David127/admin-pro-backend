const { response } = require('express');

const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {

  const medicos = await Medico.find()
                            .populate('usuario', 'nombre')
                            .populate('hospital', 'nombre');

  return res.json({
    ok: true,
    msg: medicos
  });
}

const crearMedico = async (req, res = response) => {

  const uid = req.uid;
  const medico = new Medico({
    usuario: uid,
    ...req.body
  });
  
  try {

    const medicoDB = await medico.save();

    return res.json({
      ok: true,
      medico: medicoDB
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
}

const actualizarMedico = async (req, res = response) => {

  const id = req.params.id;
  const uid = req.uid;

  try {

    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(404).json({
        ok: true,
        msg: 'Médico no encontrado por id'
      });
    }

    const cambiosPorId = {
      ...req.body,
      usuario: uid
    }

    const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosPorId, { new: true });

    return res.json({
      ok: true,
      medico: medicoActualizado
    });

  } catch(error) {

    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
}

const borrarMedico = async (req, res = response) => {
  
  const id = req.params.id;

  try {

    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(404).json({
        ok: true,
        msg: 'Médico no encontrado por id'
      });
    }

    await Medico.findByIdAndDelete(id);

    return res.json({
      ok: true,
      msg: 'Médico borrado'
    });
  } catch (error) {

    console.log(error);

    return res.status(500).json({
      ok: true,
      msg: 'Hable con el administrador'
    });
  }

}

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico
}