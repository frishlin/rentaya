
INSERT IGNORE INTO categoria (titulo, descripcion, imagen_url) VALUES
('Deportivos','Para quienes buscan velocidad y estilo.','https://cdn.buttercms.com/Uceu8voTSLSZqWIJNynC'),
('Económicos','Autos pequeños y de bajo consumo de gasolina.','https://cdn.prod.website-files.com/5ec85520c4dfff034b036be2/66bd240eca737a507fefcc68_6352dfcb46e90a64f1b72816_WF52295_LITGRE_October2022Content_best%2520selling%2520fuel%2520efficient_body1.webp'),
('Compactos','Autos un poco más grandes que los económicos.','https://siempreauto.com/wp-content/uploads/sites/9/2021/09/17229_2021_Rio_5-Door.jpg?resize=1316,740&quality=80'),
('De lujo','Para ocasiones especiales o viajes ejecutivos.','https://cdn-images.motor.es/image/m/800w/fotos-noticias/2021/10/comparativa-audi-a4-bmw-serie-3-mercedes-clase-c-202181583-1634207018_10.jpg'),
('Eléctricos / Híbridos','Amigables con el medio ambiente.','https://images.milenio.com/dVt8LkBNHVUpMB96D8Y_waW9lNE=/942x532/uploads/media/2021/04/11/este-fenomeno-esta-relacionado-con.jpeg'),
('Todo Terreno / 4x4','Para rutas difíciles o aventuras fuera de carretera.','https://api.carwyapar.com/uploads/Bright_White_81af56b4a8.jpg'),
('Clásico','De 25 años o más que ha resistido la prueba del tiempo.','https://blog.autochilango.com/wp-content/uploads/2017/04/a18f8-autoantiguo-1.jpg');

INSERT INTO `producto` VALUES (2,'Auto Deportivo.','https://loremcars.ltn.net/i/s/929574189177-046a39b172e15815b9922881719ff161/big/img.jpg','Auto Deportivo',1),(3,'Ideal para parejas','https://loremcars.ltn.net/i/s/929574189177-9eca1560293c6f97c616ada11376028b/big/img.jpg','Auto Clásico',7),(5,'Para viajar solo o en pareja','https://loremcars.ltn.net/i/s/929574189177-9756d56157dd890c7c7585c3d92fa5bb/big/img.jpg','Super clásico',7),(6,'Estilo barbie','https://loremcars.ltn.net/i/s/929574189177-88994705ba633e99c0130687c5659039/big/img.jpg','Auto Deportivo largo',1),(7,'Clásico y familiar','https://loremcars.ltn.net/i/s/929574189177-044dc5ee0e9eb2fe1bebec036ae942fd/big/img.jpg','Jeep',6),(8,'Auto veloz','https://cdn.forbes.com.mx/2020/04/b_image_2_front_track_jpg-768x433.jpg','Auto Deportivo',1),(9,'Para parejas','https://loremcars.ltn.net/i/s/929574189177-63dc5270de55940c7de6e9eb5da046e4/big/img.jpg','Camioneta para dos personas y un perro.',6),(11,'Versión eléctrica','https://img.remediosdigitales.com/d0d53e/bmw-x2/1366_2000.jpeg','BMW X2 / iX2',5),(13,'Pequeño y eléctrico','https://img.remediosdigitales.com/359966/byd-seagull/1366_2000.jpg','BYD Seagull',5),(14,'Eléctrico de enorme batería','https://img.remediosdigitales.com/d16023/cadillac-escalade-iq/1366_2000.jpeg','Cadillac Escalade iQ',5),(16,'Potencia, rapidez y lujo','https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/6B34/production/_94244472_9.jpg.webp','Bugatti',4),(17,'El mejor equipamiento','https://img.remediosdigitales.com/b3b2af/buick-envision/1366_2000.jpg','Buick Envision',1),(18,'De época','https://loremcars.ltn.net/i/s/929574189177-0ef997c0d84c398efcee75e6eeb1dce3/big/img.jpg','Clásico descapotable',7),(19,'Con una conducción totalmente eléctrica hasta 25km.','https://images0.autocasion.com/unsafe/820x/filters:watermark(watermark.png,-30,-30,0):format(jpeg):quality(80)/ad/13/1288/5f287da7e883d8a8cc37abc84f4f5f6d2368210b.jpeg','Ferrari 296 GTB',5),(20,'Para quienes no paran de desafiarse, Chevrolet Aveo Hatchback se muestra más moderno, único y listo para adueñarse de la atención.','https://www.chevrolet.com.mx/content/dam/chevrolet/na/mx/es/index/cars/2025-aveo-hb/colorizer/jellies/rojo-metalico.jpg?imwidth=3000','Chevrolet Aveo Hatchback.',3);

INSERT IGNORE INTO usuario (nombre, email, contrasenia, rol)
VALUES (
  'Administrador',
  'contra@gmail.com',
  '$2a$10$l14HCXQF6hc5f1CPGEvGNOIdpSIacby84bAUAG5HXCKqLnAuGLoSK',  -- 123
  'ADMIN'
);

INSERT IGNORE INTO usuario (nombre, email, contrasenia, rol)
VALUES (
  'oscar',
  'user1@gmail.com',
  '$2a$10$kfSq0aT4KZmrKjs8CvNkD.Rynsmi9Y.IZhvaS8uiehASuDIwtVn76',  -- 456
  'ADMIN'
);