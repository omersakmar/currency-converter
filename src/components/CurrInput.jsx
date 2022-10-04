import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
const defaultCurrencies = ["EUR", "USD", "RUB", "CNY", "TRY"];

const CurrInput = ({ value, currency, onChangeValue, onChangeCurrency }) => {
  return (
    <Card className="mb-2" bg="dark">
      <Card.Header>
        <ListGroup horizontal="md">
          {defaultCurrencies.map((curr) => {
            return (
              <ListGroup.Item
                onClick={() =>
                  onChangeCurrency ? onChangeCurrency(curr) : undefined
                }
                className={currency === curr ? "active" : ""}
                key={curr}
                action
                variant="primary"
              >
                {curr}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card.Header>
      <Card.Body>
        <Form.Control
          type="number"
          onChange={(e) =>
            onChangeValue ? onChangeValue(e.target.value) : undefined
          }
          value={value}
          placeholder="0"
          size="lg"
        />
      </Card.Body>
    </Card>
  );
};

export default CurrInput;
