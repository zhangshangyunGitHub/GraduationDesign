package com.xd.entity;

import java.util.Objects;

public class Book {
    private Integer bid;
    private String bname;
    private String publish;
    private String author;
    private Double price;
    private String edition;
    private Category category;
    private Integer inventory;
    private String isbn;

    public Integer getBid() {
        return bid;
    }

    public void setBid(Integer bid) {
        this.bid = bid;
    }

    public String getBname() {
        return bname;
    }

    public void setBname(String bname) {
        this.bname = bname;
    }

    public String getPublish() {
        return publish;
    }

    public void setPublish(String publish) {
        this.publish = publish;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getEdition() {
        return edition;
    }

    public void setEdition(String edition) {
        this.edition = edition;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Integer getInventory() {
        return inventory;
    }

    public void setInventory(Integer inventory) {
        this.inventory = inventory;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Book)) return false;
        Book book = (Book) o;
        return bid.equals(book.bid) &&
                Objects.equals(bname, book.bname) &&
                Objects.equals(publish, book.publish) &&
                Objects.equals(author, book.author) &&
                price.equals(book.price) &&
                Objects.equals(edition, book.edition) &&
                Objects.equals(category, book.category) &&
                inventory.equals(book.inventory) &&
                Objects.equals(isbn, book.isbn);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bid, bname, publish, author, price, edition, category, inventory, isbn);
    }

    @Override
    public String toString() {
        return "Book{" +
                "bid=" + bid +
                ", bname='" + bname + '\'' +
                ", publish='" + publish + '\'' +
                ", author='" + author + '\'' +
                ", price=" + price +
                ", edition=" + edition +
                ", category=" + category +
                ", inventory=" + inventory +
                '}';
    }
}
