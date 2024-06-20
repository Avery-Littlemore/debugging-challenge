import { render, waitFor, screen } from '@testing-library/react';
import App from './App';
import { getUsers } from './services/users'
import { getApplications } from './services/applications'
import { getPayments, createPayment } from './services/payments'

const mockUsers = {
  body: [
    {
      "uuid": "a2ee3f67-2c01-4f9c-be0f-ff3b98474173",
      "name": "Astrid Gillan",
      "email": "agillan0@acquirethisname.com"
    },
    {
      "uuid": "fb10a140-6f0d-41cf-926e-f2f9e63b49f4",
      "name": "Emilia Assinder",
      "email": "eassinder1@moonfruit.com"
    },
    {
      "uuid": "4e059bd8-2d93-41e9-9305-e9922f945e5f",
      "name": "Tony Earley",
      "email": "tearley2@plala.or.jp"
    },
    {
      "uuid": "ca456b9f-cd7c-414f-85f8-99534cfa4356",
      "name": "Bibby Eschelle",
      "email": "beschelle3@sohu.com"
    },
    {
      "uuid": "1ff2fbee-18e6-499a-9c3c-7209f4140fd7",
      "name": "Beatrice Skidmore",
      "email": "bskidmore4@cdbaby.com"
    },
    {
      "uuid": "35574ef8-70fd-494a-bcac-f90ee602dfd5",
      "name": "Malinde Allpress",
      "email": "mallpress5@mapy.cz"
    },
    {
      "uuid": "10eae154-5717-4e7e-b636-5a5dcc3ce0eb",
      "name": "Mervin Dibb",
      "email": "mdibb6@toplist.cz"
    },
    {
      "uuid": "ad1977df-2895-4e8a-bbed-b1ee25e7e1df",
      "name": "Selina Iannitti",
      "email": "siannitti7@amazon.de"
    },
    {
      "uuid": "64dc84e6-59f6-4c5c-8569-6bcbaa58d2d1",
      "name": "Sula Brushneen",
      "email": "sbrushneen8@squidoo.com"
    },
    {
      "uuid": "798ce5fd-a291-4649-8580-81e9c931628e",
      "name": "Adaline Cockshutt",
      "email": "acockshutt9@hao123.com"
    },
    {
      "uuid": "29d9e693-4a8c-469c-9c0b-c4c6c30b6999",
      "name": "Bettye Proctor",
      "email": "bproctora@cafepress.com"
    },
    {
      "uuid": "04c1319d-77cb-410c-9c1a-c7ede7d19b46",
      "name": "Alford Bridson",
      "email": "abridsonb@jugem.jp"
    },
    {
      "uuid": "bfb22653-6482-483c-ba1a-bc146f7f095b",
      "name": "Marcie Loffel",
      "email": "mloffelc@patch.com"
    },
    {
      "uuid": "2b8abd25-7e38-422e-a4f6-c7dacf89a738",
      "name": "Carolus Pickover",
      "email": "cpickoverd@i2i.jp"
    },
    {
      "uuid": "20d0dae1-0ce4-4b98-89ce-31a33b0e7f2d",
      "name": "Kay Parsisson",
      "email": "kparsissone@europa.eu"
    },
  ]
}
const mockApplications = {
  body: [
    {
      "uuid": "01b35179-134c-4bb1-af36-a9663c009fcd",
      "userUuid": "4aaf4534-531d-4c98-b838-23460fb34e5b",
      "requestedAmount": 44798
    },
    {
      "uuid": "023be91c-2f95-41f2-9c3c-2e871450b653",
      "userUuid": "265d6cf3-4a79-4cc7-815f-2934e0206765",
      "requestedAmount": 40058
    },
    {
      "uuid": "028248b4-eb6e-4e75-8a0d-7f4eba7488c6",
      "userUuid": "473cd1b9-eca0-482f-9e5a-2d1aec8a4e4a",
      "requestedAmount": 25551
    },
    {
      "uuid": "02ba4b80-88ff-40f1-9c74-34f52c931ba3",
      "userUuid": "22c8fcee-e09d-47e1-bd25-07bbc054d31f",
      "requestedAmount": 25233
    },
    {
      "uuid": "05993010-da7c-45da-9654-239c403921dc",
      "userUuid": "0918a5f3-4ddd-41c0-beaf-79e67ce7cdb8",
      "requestedAmount": 42182
    },
    {
      "uuid": "05b5b034-b001-459a-94b6-a899f9ab08a5",
      "userUuid": "d315c21a-19a4-4d1d-a019-b533b68da33b",
      "requestedAmount": 40110
    },
    {
      "uuid": "05b86e6a-f751-48ff-9a34-2240c96fa7a8",
      "userUuid": "35574ef8-70fd-494a-bcac-f90ee602dfd5",
      "requestedAmount": 47717
    },
    {
      "uuid": "06c4f45c-781e-473f-88eb-99726e6bf60b",
      "userUuid": "e86757ec-0ddf-410c-83ca-ba088b4008ad",
      "requestedAmount": 46469
    },
    {
      "uuid": "0722e839-0dcc-4fd8-bfed-6306e4e1e37c",
      "userUuid": "04de7a64-779d-4832-b73b-eadb7c788669",
      "requestedAmount": 48398
    },
    {
      "uuid": "09915c18-bea0-44fd-8689-b135c4b6b013",
      "userUuid": "6adaf79f-cc6e-47ad-87c9-0a15a825f50e",
      "requestedAmount": 25470
    },
    {
      "uuid": "0beff8b5-8880-41dc-9445-5e3b57bf1d96",
      "userUuid": "41a95d7d-2be3-4902-8ae5-73fabd83f03e",
      "requestedAmount": 47090
    },
    {
      "uuid": "0edc3823-4723-4815-97c5-d9cc3e6ce345",
      "userUuid": "a4974b25-bac9-48f9-944e-8795f7171874",
      "requestedAmount": 41485
    },
    {
      "uuid": "0ef56055-0927-4b66-8f70-4cab58e4546e",
      "userUuid": "8af52317-42bb-44d7-9b31-e9ddcefd8888",
      "requestedAmount": 35249
    },
    {
      "uuid": "0f18a759-da95-4580-b24f-e71b7b12349d",
      "userUuid": "6d95c48f-f795-40a9-a0ee-58eddd1d2a9e",
      "requestedAmount": 40519
    },
    {
      "uuid": "1005c152-ca3e-4436-9c7f-5a415704d43f",
      "userUuid": "a48a85a7-ee6c-437f-b7be-534f064eb51d",
      "requestedAmount": 37063
    },
    {
      "uuid": "104ec1ff-3fb1-444d-9769-ae573b1c55f5",
      "userUuid": "b565eea1-5d89-4034-ac3c-323d5ec6b200",
      "requestedAmount": 35160
    },
    {
      "uuid": "1077a1f8-34e5-4c03-86d2-0df8d99be178",
      "userUuid": "148970ba-5509-493c-be16-015c11f5ff6e",
      "requestedAmount": 35667
    },
    {
      "uuid": "10f1a015-9eeb-483f-b688-849b4c3494bc",
      "userUuid": "29b08cb6-54dd-4553-8b8f-8b865f7c8c76",
      "requestedAmount": 45060
    },
    {
      "uuid": "1243375d-6b36-4ef8-981d-5790636f8574",
      "userUuid": "69beab0a-2a3a-452e-97ed-602a86cfd516",
      "requestedAmount": 48317
    },
    {
      "uuid": "153a8e73-2d06-40a2-a5e9-2926eb4abdcd",
      "userUuid": "c9a7887e-231e-48b4-aeac-6606b67b6da8",
      "requestedAmount": 46407
    },
    {
      "uuid": "1681965c-34d0-4901-ab87-6e328aa8211c",
      "userUuid": "048db741-d846-4ca4-bd09-f0d26bf1b1e8",
      "requestedAmount": 46558
    },
    {
      "uuid": "16c7cb55-fc36-44f8-a7dc-d9c76ab2b328",
      "userUuid": "0fad6dfa-3826-4809-a6b6-a3affe71040f",
      "requestedAmount": 35673
    },
    {
      "uuid": "17d6244f-c62f-40d2-9cd3-0339cca8e9d6",
      "userUuid": "83551617-96ea-4206-b5b9-631a16067ad6",
      "requestedAmount": 42190
    },
    {
      "uuid": "1885e09d-e417-4e5a-931a-30761e08ab8b",
      "userUuid": "4c182389-983c-423e-a5f4-3ffad3cdf1f5",
      "requestedAmount": 28227
    },
    {
      "uuid": "192c17d4-8c1b-4530-947a-f056db2a26c7",
      "userUuid": "ef46eff2-5716-49b3-9d58-4a3074d39f0c",
      "requestedAmount": 45799
    },
    {
      "uuid": "1b4154e8-a027-4fd8-9ee5-e51d9d4d6903",
      "userUuid": "a54052a3-5c0a-4813-82f9-c527b868ede0",
      "requestedAmount": 47300
    },
    {
      "uuid": "1b927099-8bd1-4304-a701-d8ffefd0aa99",
      "userUuid": "7e219101-4764-4456-9843-5136e4003820",
      "requestedAmount": 43508
    },
    {
      "uuid": "1bb9243b-e8c4-4f63-a358-28ee1a29cf7b",
      "userUuid": "fd62bb62-829b-4263-b63f-1bff2a7bbb46",
      "requestedAmount": 25438
    },
    {
      "uuid": "1c6092fe-478d-4df7-b981-5ae5be7546c2",
      "userUuid": "5880d314-11dc-4069-9ec4-0f64e7ce191b",
      "requestedAmount": 34500
    },
    {
      "uuid": "1e73cf1f-b508-453b-96cf-b58187b01af2",
      "userUuid": "2ad8ba28-7e07-4dc1-97cb-2a5894e63320",
      "requestedAmount": 47923
    },
    {
      "uuid": "1faf4ac8-ce42-4fb2-b53f-54b3331f1fbf",
      "userUuid": "d9f1ad08-e22c-495c-a716-395ea231b39c",
      "requestedAmount": 43651
    },
    {
      "uuid": "20831746-ca58-4ea1-b4bf-ea25aa2ef5ae",
      "userUuid": "a5403944-7e7f-49f7-9b54-97f2b0d9c688",
      "requestedAmount": 41823
    },
    {
      "uuid": "21eb3627-ef52-4ed2-8ffd-0b9075afa979",
      "userUuid": "e2fbd2ae-e2f9-4054-ad24-87f85090a96b",
      "requestedAmount": 45682
    },
    {
      "uuid": "265a4422-c7d2-44eb-81ab-9d742c89dcf2",
      "userUuid": "42736ba9-4ba2-4bd8-bee2-9436c85a66de",
      "requestedAmount": 47872
    },
    {
      "uuid": "2663bae5-eb84-42f4-8027-7645b3211e38",
      "userUuid": "be708fa1-6407-431a-b13a-1f47c78f56c7",
      "requestedAmount": 47152
    },
    {
      "uuid": "26ed1530-c4b4-4e2d-adc0-572775bab02f",
      "userUuid": "4081ef6c-0ff4-4d25-82fd-6504a35a615c",
      "requestedAmount": 34647
    },
    {
      "uuid": "2793dda7-0aa2-4d66-b3a0-660a396919f9",
      "userUuid": "845d6a31-420b-485b-9c4e-143ae882f757",
      "requestedAmount": 30399
    },
    {
      "uuid": "291f8c01-4846-45bc-869d-26ec76255fb5",
      "userUuid": "770668c4-ed18-4a58-878f-b5a4509ad0a2",
      "requestedAmount": 28798
    },
    {
      "uuid": "299741f2-7a0f-43da-917b-31e4ea3fdf76",
      "userUuid": "70e8af68-5ee7-4740-be79-6ffe2053425d",
      "requestedAmount": 41670
    },
    {
      "uuid": "29ad8b3d-0855-4aec-b447-318d53ab1869",
      "userUuid": "f1a070dd-252d-47c5-9a80-f053adfbff14",
      "requestedAmount": 31314
    },
    {
      "uuid": "29d0f644-b9c7-4ee8-b162-a680aa1d96b7",
      "userUuid": "03b69eba-bd2a-416f-949c-dcd87dc98b98",
      "requestedAmount": 41420
    },
    {
      "uuid": "29d93223-f2e4-4d8e-8e02-50169df6599f",
      "userUuid": "f84c2dd1-81f6-4530-ba1e-e51547d625a1",
      "requestedAmount": 48606
    },
    {
      "uuid": "2b74435d-4bd9-4556-88f5-ee46ac42634c",
      "userUuid": "1437de5a-0b1c-4872-a318-45bc3f4106d6",
      "requestedAmount": 34692
    },
    {
      "uuid": "2cbf4c4f-4034-4adb-9bf0-29438f7fa3e9",
      "userUuid": "1c5cfb29-345f-45e3-a974-5c555e75ac3e",
      "requestedAmount": 36336
    },
    {
      "uuid": "2cc93b09-13cd-4574-984f-a9c483ee8757",
      "userUuid": "87c8f931-64bc-47e5-bfb6-17e700161942",
      "requestedAmount": 28902
    },
    {
      "uuid": "308f9ce0-080e-4c05-be67-28a341bc8cc5",
      "userUuid": "51a674d8-4921-47d7-90a6-a5804cc16eb9",
      "requestedAmount": 26727
    },
    {
      "uuid": "3188e1b2-97e2-4042-bcb0-91bce565d219",
      "userUuid": "d97a2468-f911-4e50-9be8-52a1ac9b9ce5",
      "requestedAmount": 31013
    },
    {
      "uuid": "336f85ec-28c2-45f9-8620-16fbae651d03",
      "userUuid": "652a0215-475a-4f1c-9d50-2c3bb7af1034",
      "requestedAmount": 34477
    },
    {
      "uuid": "34071e4c-621c-41ee-af1e-574e7e635a44",
      "userUuid": "4a181dad-8946-4ff4-ab9d-34f88443cc85",
      "requestedAmount": 39891
    },
    {
      "uuid": "37cdd42e-5a1a-4da8-b11f-27d4e1f35af3",
      "userUuid": "9467fba0-72ec-4808-9d07-297f6ca955c5",
      "requestedAmount": 34081
    }
  ]
}
const mockPayments = {
  body: [
    {
      "uuid": "8722073f-6520-44b7-a6ab-f04de644324d",
      "applicationUuid": "01b35179-134c-4bb1-af36-a9663c009fcd",
      "paymentMethod": "ACH",
      "paymentAmount": 44798
    },
    {
      "uuid": "48b998a4-07ea-40ce-bd83-c75832fe2dce",
      "applicationUuid": "023be91c-2f95-41f2-9c3c-2e871450b653",
      "paymentMethod": "ACH",
      "paymentAmount": 40058
    },
    {
      "uuid": "630890b2-3ca0-46a2-b4a3-3da1cb5ed76b",
      "applicationUuid": "028248b4-eb6e-4e75-8a0d-7f4eba7488c6",
      "paymentMethod": "ACH",
      "paymentAmount": 25551
    },
    {
      "uuid": "79b12375-839c-4418-8304-e48b7dacdf1f",
      "applicationUuid": "02ba4b80-88ff-40f1-9c74-34f52c931ba3",
      "paymentMethod": "ACH",
      "paymentAmount": 25233
    },
    {
      "uuid": "e4068685-69bf-44c3-97e9-7364ed1b51a7",
      "applicationUuid": "05993010-da7c-45da-9654-239c403921dc",
      "paymentMethod": "ACH",
      "paymentAmount": 42182
    },
    {
      "uuid": "fce40e75-72f8-47f3-9a1c-ff745da9dfb5",
      "applicationUuid": "05b5b034-b001-459a-94b6-a899f9ab08a5",
      "paymentMethod": "ACH",
      "paymentAmount": 40110
    },
    {
      "uuid": "ae2b020d-d8b7-409d-988a-38c136945986",
      "applicationUuid": "05b86e6a-f751-48ff-9a34-2240c96fa7a8",
      "paymentMethod": "ACH",
      "paymentAmount": 47717
    },
    {
      "uuid": "61494ceb-cad6-41a8-b4a2-4a44d2740e07",
      "applicationUuid": "06c4f45c-781e-473f-88eb-99726e6bf60b",
      "paymentMethod": "ACH",
      "paymentAmount": 46469
    },
    {
      "uuid": "3fe48d9b-1443-4be3-9151-3e538ccb8619",
      "applicationUuid": "0722e839-0dcc-4fd8-bfed-6306e4e1e37c",
      "paymentMethod": "ACH",
      "paymentAmount": 48398
    }
  ]
}
const mockSingleUser = {
  body : [
    {
      "uuid": "a2ee3f67-2c01-4f9c-be0f-ff3b98474173",
      "name": "Astrid Gillan",
      "email": "agillan0@acquirethisname.com"
    }
  ]
}

jest.mock('./services/users.js')
jest.mock('./services/applications.js')
jest.mock('./services/payments.js')

test('table renders with headers', async () => {
  getUsers.mockResolvedValue(mockUsers)
  getApplications.mockResolvedValue(mockApplications)
  getPayments.mockResolvedValue(mockPayments)

  render(<App />);
  await waitFor(() => screen.getByRole('table'))
  const uuidHeader = screen.getByText(/Uuid/g);
  expect(uuidHeader).toBeInTheDocument();
  const nameHeader = screen.getByText(/Name/g);
  expect(nameHeader).toBeInTheDocument();
  const emailHeader = screen.getByText(/Email/g);
  expect(emailHeader).toBeInTheDocument();
  const requestedAmountHeader = screen.getByText(/Requested Amount/g);
  expect(requestedAmountHeader).toBeInTheDocument();
  const paymentAmountHeader = screen.getByText(/Payment Amount/g);
  expect(paymentAmountHeader).toBeInTheDocument();
  const paymentMethodHeader = screen.getByText(/Payment Method/g);
  expect(paymentMethodHeader).toBeInTheDocument();
  const initiatePaymentHeader = screen.getByText(/Initiate Payment/g);
  expect(initiatePaymentHeader).toBeInTheDocument();
});

test("Pay button only shows for people with requested amounts posted and no amount paid; otherwise, Pay button is hidden", async () => {
  getUsers.mockResolvedValue(mockUsers)
  getApplications.mockResolvedValue(mockApplications)
  getPayments.mockResolvedValue(mockPayments)

  render(<App />)

  const rows = await screen.findAllByRole('row')
  
  rows.forEach((row) => {
    const cells = row.querySelectorAll('td')
    if (cells.length < 6) return

    const requestedAmount = cells[3].textContent.trim()
    const paymentAmount = cells[4].textContent.trim()

    const buttonCell = cells[6]
    const hasButton = buttonCell.querySelector('button')

    if (requestedAmount && !paymentAmount) {
      expect(hasButton).toBeInTheDocument()
      expect(hasButton.textContent).toBe('Pay')
    } else {
      expect(hasButton).not.toBeInTheDocument()
    }
  })
})

test("User can't be paid out funds if they don't have an application yet", async () => {
  getUsers.mockResolvedValue(mockSingleUser)
  getApplications.mockResolvedValue({ body: [] })
  getPayments.mockResolvedValue({ body: [] })

  render(<App />)

  await waitFor(() => {
    const button = screen.queryByRole("button")
    expect(button).not.toBeInTheDocument()
  })
})
