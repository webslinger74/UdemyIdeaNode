const {
  fileReader,
  fileWriter,
} = require('../functionHelpers/fileReaderAndWriter');

const fileReaderHelper = (response) => {
  fileReader('./data/fruitData.json').then(
    (data) => {
      response.render('fruits.html', { fruitData: JSON.parse(data) });
    },
    (error) => {
      console.log(error);
    }
  );
};

exports.getAllFruitsPage = () => {
  return async (req, res) => {
    fileReaderHelper(res);
  };
};

exports.getInputAFruitPage = () => {
  return async (req, res) => {
    res.render('fruitsInput.html');
  };
};

exports.addNewFruit = () => {
  return async (req, res) => {
    fileReader('./data/fruitData.json').then(
      (dataReturned) => {
        dataReturned = JSON.parse(dataReturned);
        const lastitem = dataReturned[dataReturned.length - 1];
        const highestId = lastitem.id;
        const id = highestId + 1;
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        req.body = { id, ...req.body };
        const data = [req.body];
        let fullData = [...dataReturned, ...data];
        fullData = JSON.stringify(fullData);
        fileWriter(fullData).then(
          (result) => {
            fileReaderHelper(res);
          },
          (reject) => {
            console.log(reject);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  };
};

exports.getIndividualFruitPage = () => {
  return async (req, res) => {
    fileReader('./data/fruitData.json').then(
      (dataReturned) => {
        dataReturned = JSON.parse(dataReturned);
        const filtered = dataReturned.filter(
          // eslint-disable-next-line eqeqeq
          (item) => item.id == req.params.id
        );
        res.render('fruitInd.html', { fruitData: filtered });
      },
      (error) => {
        console.log(error);
      }
    );
  };
};

exports.deleteIndividualFruit = () => {
  return async (req, res) => {
    console.log(req.body.id, 'the id of the product to be deleted hopefully');
    fileReader('./data/fruitData.json').then((dataReturned) => {
      dataReturned = JSON.parse(dataReturned);
      const filteredData = dataReturned.filter((item) => {
        // eslint-disable-next-line eqeqeq
        return item.id != req.body.id;
      });
      console.log(filteredData);
      fileWriter(JSON.stringify(filteredData)).then(
        (response) => {
          fileReaderHelper(res);
        },
        (reject) => {
          console.log(reject);
        }
      );
    });
  };
};
