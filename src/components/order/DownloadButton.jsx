import React from 'react';
import { jsPDF } from 'jspdf';
import "jspdf-autotable"; // Import the autotable for table layouts
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAckAAAC1CAAAAAARw1ujAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAD/h4/MvwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB+gJGBIMF566k5sAAAKqelRYdFJhdyBwcm9maWxlIHR5cGUgeG1wAABIx6VWS7KjMAzc6xRzBFuyJXMcCsxuqmY5x5+WgYQEw0tqQj0+D6kltVsy9Pf3H/qFX+SkJJMVGa3obEFnzZY0cvBnnbSa+DuZ2TRq0kVZs4zr/x/WC5tUCiOH1wPQDCeVMXNKSd9g13cOXSzhCDICaiFrP64GK666wNB4kSiDH7gLwjgzzvMKgqvYAFhkY4VnD8BCnlYY7/JCUtlEBc+DBbgPKLEiz+09imZFRqjTE2U7gx1LgpOcCwJwBuDElfZi3BDnDMfsNHrqSBlFcpWN0F7eLcBoiZBucue+2aO8qBMyv7EhJD3psJfRnqJWNS+jUQmGVEFrdijPC4wVFTw5c4OpZgDOBMwoEy8P6gDbj/y06eVHT7O92vtiD3Avq0n7cv6vCGhVwaciSLEtPsCUX8VAroamzaoHIwfeYlYQu+gMK3TbQxDhXRD0LOIlmhMKt3tRZEG5cbWhK6NNFNsTJkNE3XDMycARlgKFZW68OTFMSDxfqfYtRyc6OwE4Y/HRqWhoSTzjOhAuvCrp3u2nQFB2glItpaFFKTgy9BTF9SxQdlS/wfAQjCbEjrgrGDHBBwr0EMVQKIAKzIK7+8tOZocwd1nRZg74LSegtz9t0FGSx8RdRrBeoM2TPqE5J18Z1Fcea+ZUv4DSleF9n51bm85GR5mdoa5kS3dx+43ab2/6dshftTe99zcY6u5be2Pv2+SzmVcP2rpZrsf7Bu0jxGdC8e1CapoBUwA8q4s2IaPkKSefyW1el8ZS1/luJek7Sq8Zpe8oPTHaPj7ckj6mFHxYuJqPB0Fu2Mfxgepd8zgmkCu+32EXw0cPFx9p2P28PB9uzAM1un4A+WRboh7J7273QOtXFF3GO33H4avsHy80PKfNe7lhAAAAAW9yTlQBz6J3mgAADb9JREFUeNrtnXtwFdUdx89kMgyZZJIJjGYCY2GCMBKd8upoQWAQiqg4iPJyxkeoHYWigFKKiBTjozwUxfrCWiFCFUPKQwwUtGB5tmqEKKIQTYtRItYQQhIIgdzcbRKSe/f3O+fsnt3k3muY7+e/nOdvf9+9u+fxOxshAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7ZuU2Vu/ra4uyZ+eEGtLQKu4t8xqpnR8rG0BrWCpFab+4VhbA3wzzbITwK+yvdK5jChp/adjrC1qn2zZZ+etGFgw3WKMi7VP2if0B3E4Bhas40q+FGuftE9ir+Q+ruTGWPvEjSFPGnB7tK2Ckt6ZaxmwLtpWxV7J9dwHL8fACE9ASTXtb8QDJdV0+pG6oLhDDIzwBJTUcB8xITA2FjZ4Akrq+KNdyAdjYoInoKSWu39oMaBkTGws8ASU1JM4/d3ik+Vfb7jvJ/+ObARKXixAyYsFKHmxACUvFpiSr01VcX1jyeR0ShpvKo4VuETVX/Kw6S/nbtm9d8emVx8dc6nOKp2SrItkuWYaKdBZ3XznW+cs3/je7n0f5K/InnCZukwi7epCKE8Su0TlpuWl6e42JAya+sKa/J17t61bMXd0eiSUnKwveV0d+6U+wArMZvnPSE30emQPaSTw6bN9PSnZg913cs0qUuBzRdtXLf0sYC8TPPzCAFPHTGCX+ISiYnqAlpF3VzNm76glFhxcOjiaSoqn2WVU9SbZaeU0+xC/YYdvZtfYxL4JUVVy1J6gwoido8wc04FFEnyssH0aa/tmlj94o8oNn2TFRU/JDoWs93+RzlfSzPPX0to/32lp2DcwakpmbNPYEMzjjzi1Y1bQ1EBX2YJ8WqSUKpS5XeeGr1u5/OBBSdGvhnWebcu8ht1pS0nV+OwaS8v5J/n9GCElby/XG1HCHnBqx/yK1ZouGZBALbBesWfGzT+jtyCYKw09IqWkNNCttf2a9tKsL8izNfUfliPvpUZDyWkBJxuqbjJxzFGavEUyYBxr1v5oStlmOVLcJ1pKCv6E/DIUnT2ZZtSRO7z7Z5YLhXSgGxElJ9U721A1yMAxz9Hk04ncgBxaoMiW1a3QzQ0nb4iWkpdXsK5bdtKTvqXpz9prdfrC7Qosq4DMKCKhZO9TbjYcsz/dNI7px+pM5AZ8R/MX2txwyN0Nlb+MkpLiXtZzffMjiY1rv7SfpIjf4X4FbPUhEkpu9maDzjHs8bKK9X8tzQ5mht2w3TKgtEeUlBTvsJ6/a3osXkHHM3VD7FWeN7kCy5oZWSWvMzAhaJuM6BzzGPM865/d0gXhnGVmbtgbLSXTj7Oe1zamvkvTltlrDKyzjKi03Y0RUPItExt2ujsmgw2bhtL+2U82fJ5k4HkzN1izo6SkGMdn1llCjKYph+3P1rgDhldgrYmkknEVtOr+BbeNGDN9LZsUBPu5O2YPzaCzrQzqnbrQfNPcDVXd20TJtdky7PRgDuu5vHs8HdHUkdt0ssLYsyWlijs0EB6Dt72SV9Oac5qTL9tC0592V3IGzThIumcrltv1bqjLnzEwo9vVU3LP8hyf8ZgGeyFsCTilmOVvf5j+/Twpvp83d2pp/4bkxNHrpUnBiggqeQ9Jzw+lx20kGQfclbyEuj7Y0949G9Xcp3XD9tBS52VvsqxqfwsE3pUUw/kEm/6+jpDf8A28tV0ZLVk38RWXqqTIKfl7kv67cIVOpK/zocmQ/rXDBsH2o5UpVOXTKTo3kJHE/eyefjxaSpIzohKBYaTsapa92zaVHsofLCF3tb2Sj5D0BbYar5Kc0IqGXsm7ac4/hTZrvc4Nf6VGZ9Pc/VFTssOnDqX/RMt+T3NPkIXqJ1jd0JW3vZJ0h+KgLcZqxFo7Bkom0CWG2k7hrLW0UnjZgLqhtBM1Ov4wya7PED7wo6QYcFZbuIguXw1l2Q+R3AS2SXQ8ckqy5dD3unl0jE1JPqEJZ8VRu8tC9wtzQzbvjD4xrAejpqSYpysbuI4WnE+zK9ky5SgWnNDyim17JdPZ5Knm7Vvi/Sp5M83KC2VcTzNWatxQL4Up9KEVVwgf+FNS7NaUfYGVY+OyNSYmRURJ8aVka/mmWf30JjgoGVdKsk6EbokXaZ2RGjcUSZ11pPfZvigq2VO9HF3EtwYKaP79sVPyUaXBP65/oLtnJcUrNO/GlvQikvyNzg0/bJWg04GyKCoppqhKBoY7S2INdDcoUkp2/sFSU//pkv4elWTL5C2byVfRZNtMo8zyRH00leRLrU28KJWqpQUS3cyJnJJioiqAp5lDC7p4UZL9+IqbUx+jVWxxXrWWNzQxgV6UPFsl00lZsYt8j38lCdWRFjhnalVEdprnWw6cWc6COh2VXEgz+15IpSfabct4HS2P9BTe8byCrruahmfrCFluWqI8pkqKOY67MsfpqWVHx2TS33d2U2JanSJR5QZ3MoV3fCvZRXr2V8oTWnYJJ2OrpBhd4uS+wCPmjqFDmA+b0qbS1mybdJ6V9BPL7FvJPLn/D6RCP6mnawPJSxyi6yxrnrFj6KZBoOktS0cO9h1jr0/XoPNUt22VHK+yYI5UjC0GJRm2bqjkG3LNc45KNmj5wC79MzZoe8A6O6YrbaRxdtWxkiTZQyCEfk1MyWkfQvpVMvU7lQU1fXk59t0F06B5QyU3yXbRAqrTBCJ92ibdL/N4eNjj4hi6fbW5IeU2klJLzrxQNxxc5oLqkEKklHxd7Yn9/PTvRzR/RiuV7Eqbk4P5+xso2UDckAXblGsb2aaOofPp6gQenk4DYakbtotI4E/JkbrQ0SWsINvNyTNrXqtkIm3urHRWaqaZko3ED3+mUJpifmPqmJTTJHu8EHQ0lUVKryJ5R386SibQmbGNumG0JFvkr2bn5MbOpritoAv2jpM+d8QOZTgp2UjvhfwtcZWpY+hHtHLEQPI32ypgURWtCTVvWyWftbR8RbVi61oWGeiLJPa+OtaSoVWSbXfuYIZdwcIZ3JRsuClZDOc0U8dMZJYvJn+zrQIqs+I8YoyUvMYp4O91WvYYzT1F9gX5Ob5cVyXZ6ZMg+zbi31mDISX3fGKHxMPRyUPo9eDmGHYAb3Ah+ZOfu6KP3kp6xCuxiC6q+TvD7UPJeMeAv+CtpHAOyy6wneUZdY5lTnJVkjdXTg6xPsWNCSl5hCSTFxUNqw9tDbo6hpqSQ0YO3/PDZ2yE+D6ZMPLQ7pXCDz6U/AOtUsHsKCWhYfyYmlVwZUvW7ex8mnUiNIDRKvlb3typ8EHaZHlAHVKSvT/v0ir5hrFjRpJ8+lhfzgsPY4bl2WbWPCArvEsWYSWvpNG+NX151OQGUpzNQxoqvDaiYWCTdsf7kt/D20BaJX8mb2js+nXTJHDA44ptq5CSD9H0sr7hJreqbXB3zFFLizxvZq8F6/OxzRldV/JLOih8wQwu+VzFc/Yau2iNxWI4XzT5jb34HYoLDZ6sVGwx1XR3V1KogsECPxYdrbJUhJTszoZCZS3KxLNAwRkaxyiUXKYVUg4KkI5VWtaR5Q/edU/2ZvmE8JQ2UVKN/QwT+/Dpt0ly1GQFOW/0kUkPjdii8vRKzjJtjSopnUyyDi+ZMGTw+EVfseS+5kr213a7SOHoXZYhB3x+cMCrkt0q5CuUoibtIaBigOE26zHb9qpeyRTXU5BqJa+tN6pQpHOMQklxUNNI8EpF4cwzrp03odgbjIySbOhwYcVfipqca+9ikdEVBG+zVXH4stJTRq1JSvIPWmiY70XJbE0jBULFPNfOm3ha+MSjknfSjEBzYA4Pd6qxB63FGZxBZbNlByUT/utPydSjBuVLknWOUSnZQ/PdgrlCydsmFu/ys6HlQ8lL2enJnBax2FE0q9C+lJ5scOJsHXk7OH3t7Eannf8T9FFuX+Ppd9LViOAkrWNUSkoD0gvUab661dHgVVmoDrVpeyVZ+GpFKI6pZyWrQn5i6R+69fAO3URx/G6dw2Oq7maHneaRFW5WLNE7RqnkTGUr2q2O1PfdDDjQRfjGk5Jj2NzB9hiZyqrUkWD0xHecO3iJjdecv0D4nK6Z85MdYwYGOAZ/sPm8iZKXKAdzU7XOjl/hbEB+svCPFyWTj9LkI/YfEhsKWcXUqlmV+uZP3sWtcvmW5Hz1C6p8nEv0R1qepaeWvt6Mlky2KNo5kyr0TP6f3oBqv+fSvSv5Mksea29Iippkq4c93tXMA+pz5dM2bl8FHVGsaOiDy4Xrd+smaL+kUvALR8eolcxSNLRBOJG2SrP9UL+pt2gVHpQcyn4J7PtQPDI4yDcPB+Sek5s+97erFVa5ft816VG2v2V9dmFbxPVbkln/VkUwfyx9V8dIyUTFk2aScKbnq9VypdpNg0QrMVeyA7udz/L57ypW63sp1i/9/i3kKs7smKOOBzT4Um9i1sbwIsGxVS3fX3H/KqjIXLiXLJGdP6D6NqnZgvQayVcn3D9/n5qVd8JepXrHvFaMdGJFXJ+sxX/J3bx14+ol0wa19r9zZt758FPLFs6d2MtrxYSh9y7Oydu8dcObz8+8McVr7bag16Qn/rwmf+v61UunDMU/KQUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO2L/wO1TWaxpEkH4QAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyNC0wOS0yNFQxODoxMTo1NyswMDowMOp0AmAAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjQtMDktMjRUMTg6MTE6NTcrMDA6MDCbKbrcAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDI0LTA5LTI0VDE4OjEyOjIzKzAwOjAw2YENCgAAABx0RVh0cGRmOkF1dGhvcgBNb2hhbW1hZCBBYmR1bGxhaK6tNuQAAAAgdEVYdHhtcDpDcmVhdG9yVG9vbABDYW52YSAoUmVuZGVyZXIpz3l9gwAAAABJRU5ErkJggg=="; // Replace this with the full Base64 string

const formatDateTime = (createdAt) => {
    if (!createdAt) return "N/A"; // Handle invalid or null dates
  
    const date = createdAt.toDate(); // Assuming it's a Firestore Timestamp
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Month in full form
    const datePart = new Intl.DateTimeFormat('en-US', options).format(date);
    
    const timePart = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  
    return `${datePart} at ${timePart}`;
  };
  

const DownloadButton = ({ orderDetails }) => {
  const { id, shippingAddress, totalAmount, cart, createdAt } = orderDetails;
  const { firstName, lastName, email, phoneNumber, apartmentDetails, streetAddress, town, pincode } = shippingAddress;

  const generatePDF = (e) => {
    e.stopPropagation();
    const doc = new jsPDF();


    
    // Add a logo (optional)
  doc.addImage(logoBase64, "JPEG", 20, 10, 25, 10); // (image, format, x, y, width, height)


    // Add title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text('Invoice / Bill', 120, 20);


    // Add Order Information
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Order ID: ${id}`, 20, 30);
    doc.text(`Customer Name: ${firstName} ${lastName}`, 20, 40);
    doc.text(`Email: ${email}`, 20, 50);
    doc.text(`Phone: ${phoneNumber}`, 20, 60);
    doc.text(`Address: ${apartmentDetails}, ${streetAddress}, ${town}, ${pincode}`, 20, 70);
    doc.text(`Date: ${formatDateTime(createdAt)}`, 20, 80);

    // Add a line separator
    doc.setDrawColor(0);
    doc.line(20, 85, 190, 85); // Horizontal line

    // Order Items Table
    const tableColumn = ["Sr.", "Item", "Price", "Quantity", "Total"];
    const tableRows = cart.map((item, index) => [
        index+1,
      item.name,
      `$${item.price}`,
      item.quantity,
      `$${item.price * item.quantity}`
    ]);

    // Add the table to the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 90,
      styles: { fontSize: 10 },
      foot: [[
        '', 
        '', 
        'Total Price:', 
        `$${totalAmount}`
      ]],
      footStyles: { fontStyle: "bold" },
    });

    // Add footer message
    doc.text("Thank you for your order!", 105, doc.lastAutoTable.finalY + 10, { align: "center" });

    // Download PDF
    doc.save(`Order_Bill_${id}.pdf`);
  };

  return (
    <div>
      <button onClick={generatePDF} >
        {/* <p className="mr-2">Download Bill</p> */}
        <FileDownloadIcon fontSize='small' />
      </button>
    </div>
  );
};

export default DownloadButton;
