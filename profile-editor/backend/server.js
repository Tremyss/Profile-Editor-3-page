const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json()); // * ezt a 7. sort kellett +ban beletenni
app.use(fileUpload());

app.get("/", (req, res) => {
	console.log(path.join(`${__dirname}/../frontend/index.html`))
	res.sendFile(path.join(`${__dirname}/../frontend/index.html`))
});

app.use("/public", express.static(`${__dirname}/../frontend/public`));

app.get("/profile.jpg", (req, res) =>
	res.sendFile(path.join(`${__dirname}/../backend/data/profile.jpg`))
);

// ? eredeti kód
app.post("/", (req, res) => {
	const pictureUploadPath = __dirname + "/../backend/data/" + "profile.jpg";

	console.log(req.files);

	if (req.files) {
		const uploadedPicture = req.files.picture;
		uploadedPicture.mv(pictureUploadPath, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
		});
	}

	const fileData = JSON.parse(JSON.stringify(req.body));

	fileData.picture = "/profile.jpg";
	const fileDataString = JSON.stringify(fileData, null, 2);
	const uploadPath = __dirname + "/../backend/data/" + "profile.json";

	fs.writeFileSync(uploadPath, fileDataString, (err) => {
		if (err) {
			console.log(err);
			return res.status(500).send(err);
		}
	});

	return res.send(fileDataString);
});

// ? edited code to handle /upload

/* app.post("/upload", (req, res) => {
	const pictureUploadPath = __dirname + "/../backend/data/" + "profile.jpg";

	if (req.files) {
		const uploadedPicture = req.files.profileImage;
		uploadedPicture.mv(pictureUploadPath, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
		});
	}

	return res.status(200).send("File uploaded successfully");
});
 */


app.delete("/", (req, res) => {
	const pictureUploadPath = __dirname + "/../backend/data/" + "profile.jpg";
	const uploadPath = __dirname + "/../backend/data/" + "profile.json";
	console.log(pictureUploadPath)
	console.log(uploadPath)

	if (fs.existsSync(pictureUploadPath)) {
		fs.unlinkSync(pictureUploadPath, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
		});
	}

	if (fs.existsSync(uploadPath)) {
		fs.unlinkSync(uploadPath, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
		});
	}

	return res.status(200).send("done");
});

app.listen(9000, (_) => console.log("127.0.0.1:9000"));
