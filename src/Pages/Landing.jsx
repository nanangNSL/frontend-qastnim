import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../assets/css/landing.css";
import Button from "react-bootstrap/Button";
import { Table, Space, Modal, Form, Input } from "antd";
import axios from "axios";
import * as Constans from "../Constans"
const { Search } = Input;

export default function Landing() {
  // eslint-disable-next-line no-unused-vars
  const [sortBy, setSortBy] = useState("nama_barang");
  // eslint-disable-next-line no-unused-vars
  const [sortorder, setSortOrder] = useState("ASC");
  const [databarang, setDatabarang] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentData, setCurrentData] = useState({});

  const columns = [
    {
      title: "Nomor",
      dataIndex: "id_nomor",
    },
    {
      title: "Nama Barang",
      dataIndex: "nama_barang",
      sorter: {
        compare: (a, b) => a.nama_barang - b.nama_barang,
        multiple: 3,
      },
    },
    {
      title: "Stock",
      dataIndex: "stock_barang",
      sorter: {
        compare: (a, b) => a.stock_barang - b.stock_barang,
        multiple: 2,
      },
    },
    {
      title: "Jumlah Terjual",
      dataIndex: "jumlah_terjual",
      sorter: {
        compare: (a, b) => a.jumlah_terjual - b.jumlah_terjual,
        multiple: 1,
      },
    },
    {
      title: "Tanggal Transaksi",
      dataIndex: "tanggal_transaksi",
      render: (date) => date.slice(0, 10),
      sorter: {
        compare: (a, b) => a.tanggal_transaksi - b.tanggal_transaksi,
        multiple: 1,
      },
    },
    {
      title: "Jenis Barang",
      dataIndex: "jenis_barang",
      sorter: {
        compare: (a, b) => a.jenis_barang - b.jenis_barang,
        multiple: 2,
      },
    },
    {
      title: "Action",
      dataIndex: "english",
      render: (_, record) => (
        <Space size="middle">
          <Button variant="secondary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button variant="dark" onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (data) => {
    setCurrentData(data);
    setVisible(true);
  };

  const handleDelete = async (data) => {
    console.log(data);
    await axios
      .delete(`${Constans.API_URL_BARANG}/${data?.id_nomor}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = async () => {
    axios
      .put(`${Constans.API_URL_BARANG}/${currentData?.id_nomor}`, {
        nama_barang: currentData.nama_barang,
        stock_barang: currentData?.stock_barang,
        jumlah_terjual: currentData?.jumlah_terjual,
        jenis_barang: currentData?.jenis_barang,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setVisible(false);
  };


  useEffect(() => {
    axios
      .get(
        `${Constans.API_URL_BARANG}?sort_by=${sortBy}&q=&sort_order=${sortorder}`
      )
      .then((res) => {
        setDatabarang(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Container fluid className="border">
        <Row className="d-flex flex-row justify-content-center">
          <h1 className="text-crud ">CRUD BARANG</h1>
          <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
    //   onSearch={onSearch}
    />
          <Col className="p-2">

          <Table
          className="shadow"
            columns={columns}
            dataSource={databarang}
          />
          </Col>
         
          <Modal
            title="Edit Data"
            open={visible}
            onOk={handleUpdate}
            onCancel={() => setVisible(false)}
          >
            <Form>
              <Form.Item label="Nama Barang">
                <Input
                  value={currentData.nama_barang}
                  onChange={(e) =>
                    setCurrentData({
                      ...currentData,
                      nama_barang: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Stock">
                <Input
                  value={currentData.stock_barang}
                  onChange={(e) =>
                    setCurrentData({
                      ...currentData,
                      stock_barang: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Jumlah Terjual">
                <Input
                  value={currentData.jumlah_terjual}
                  onChange={(e) =>
                    setCurrentData({
                      ...currentData,
                      jumlah_terjual: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Jenis Barang">
                <Input
                  value={currentData.jenis_barang}
                  onChange={(e) =>
                    setCurrentData({
                      ...currentData,
                      jenis_barang: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Form>
          </Modal>
        </Row>
      </Container>
    </React.Fragment>
  );
}
