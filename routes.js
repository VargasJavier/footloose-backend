const express = require("express");
const routes = express.Router();

// --------------FAVORITES

// TRAER FAVORITOS
routes.get("/favorites/:iduser", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "SELECT * FROM favorites f INNER JOIN music m ON m.idmusic = f.idmusic WHERE iduser = ?;",
      [req.params.iduser],
      (err, rows) => {
        if (err) return res.send(err);
        res.status(200).json({
          success: true,
          musics: [...rows],
        });
      }
    );
  });
});

// ADD FAVORITES
routes.get("/addFavorites/:iduser/:idmusic", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    console.log(req.params);
    conn.query(
      "INSERT INTO favorites (iduser, idmusic) VALUES (?, ?)",
      [req.params.iduser, req.params.idmusic],
      (err, rows) => {
        if (err) return res.send(err);
        console.log(rows);

        if (!rows) return res.send("INSERTAR REGISTRO");
        // INSERTAR REGISTRO;

        res.status(200).json({
          success: true,
          message: "Se creó el registro con éxito",
        });
      }
    );
  });
});

// ADD MUSIC
routes.post("/addMusic", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("INSERT INTO music set ?", [req.body], (err, rows) => {
      if (err) return res.send(err);

      res.send("music inserted!");
    });
  });
});

// DROP FAVORITES
routes.delete("/deleteMusic/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "DELETE FROM music WHERE idmusic = ?",
      [req.params.id],
      (err, rows) => {
        if (err) return res.send(err);
      }
    );
  });
});

// SABER EXISTENCIA
routes.get("/authMusic/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "SELECT * FROM music WHERE idmusic = ?",
      [req.params],
      (err, rows) => {
        if (err) return res.send(err);
        console.log(rows);

        if (!rows)
          return res.status(200).json({
            success: false,
            message: "No se encontraron registros",
          });

        res.status(200).json({
          success: true,
          message: "Se encontraron registros",
        });
      }
    );
  });
});

// --------------USER

// REGISTRO
routes.post("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("INSERT INTO user set ?", [req.body], (err, rows) => {
      if (err) return res.send(err);

      res.send("user inserted!");
    });
  });
});

// AUTENTICACIÓN
routes.post("/auth", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "SELECT * FROM user WHERE email = ?",
      [req.body.email],
      (err, rows) => {
        if (err) return res.send(err);
        console.log(rows);

        if (!rows)
          return res.status(200).json({
            success: false,
            message: "No hay una cuenta asociada",
          });
        if (rows[0].password != req.body.password) return res.send("ERROR");
        delete rows[0].password;

        res.status(200).json({
          success: true,
          user: rows[0],
          message: "Bienvenido",
        });

        // res.send("user inserted!");
      }
    );
  });
});

// ACTUALIZAR USER
routes.put("/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "UPDATE user set ? WHERE id = ?",
      [req.body, req.params.id],
      (err, rows) => {
        if (err) return res.send(err);

        res.send("user update!");
      }
    );
  });
});

module.exports = routes;
